<?php

function getRemoteWordPressVersion()
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'soak/flow-autoupdater');
    curl_setopt($ch, CURLOPT_URL, 'https://api.github.com/repos/roots/wordpress/tags');
    $result = curl_exec($ch);
    curl_close($ch);

    $json = json_decode($result, true);

    return trim($json[0]['name']);
}

function getLocalWordPressVersion()
{
    $json = json_decode(file_get_contents('./composer.lock'), true);

    $row = array_values(array_filter($json['packages'], function ($package) {
        return $package['name'] === 'roots/wordpress';
    }));

    return trim($row[0]['version']);
}

function getLockHash()
{
    $json = json_decode(file_get_contents('./composer.lock'), true);

    return $json['content-hash'];
}

function getFlowVersion()
{
    $result = shell_exec("git describe --tags $(git rev-list --tags --max-count=1)");

    return trim($result);
}

function getVersionPart(string $version, $part = 0)
{
    $parts = explode('.', $version);

    return $parts[$part];
}

define('FLOW_VERSION', getFlowVersion());
define('REMOTE_WP_VERSION', getRemoteWordPressVersion());
define('LOCAL_WP_VERSION', getLocalWordPressVersion());
define('LOCK_HASH', getLockHash());

$isMajorUpdate = false;

// Check WordPress versions and insert new one.
if (version_compare(REMOTE_WP_VERSION, LOCAL_WP_VERSION, '>')) {
    $isMajorUpdate = getVersionPart(REMOTE_WP_VERSION, 1) > getVersionPart(LOCAL_WP_VERSION, 1);

    if ($isMajorUpdate) {
        echo 'Major WordPress update, set a new constraint in composer.json...' . PHP_EOL;
        $newVersion = sprintf('%d.%d', getVersionPart(REMOTE_WP_VERSION, 0), getVersionPart(REMOTE_WP_VERSION, 1));
        shell_exec("composer require roots/wordpress:^{$newVersion} --no-update");
    }
}

// Update packages
echo 'Updating composer dependencies...' . PHP_EOL;
shell_exec('composer update --no-suggest --no-scripts --no-progress --no-autoloader --root-reqs --ignore-platform-reqs');

// Changes not detected
if (LOCK_HASH === getLockHash()) {
    echo 'No changes detected' . PHP_EOL;
    die(0);
}

if ($isMajorUpdate) {
    $flowVersion = sprintf('%d.%d.%d', getVersionPart(FLOW_VERSION, 0), getVersionPart(FLOW_VERSION, 1) + 1, 0);
} else {
    $flowVersion = sprintf('%d.%d.%d', getVersionPart(FLOW_VERSION, 0), getVersionPart(FLOW_VERSION, 1), getVersionPart(FLOW_VERSION, 2) + 1);
}

echo 'Committing changes to repository...' . PHP_EOL;
shell_exec('git add composer.lock composer.json');
shell_exec('git commit -m "Pipelines: automatic update of composer packages"');
shell_exec(sprintf('git tag -a %s -m "%s"', $flowVersion, $flowVersion));
shell_exec('git push origin HEAD:master --follow-tags');

echo 'Complete';
die(0);
