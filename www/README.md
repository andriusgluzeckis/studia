# Soak Flow

Flow is a fork of Bedrock that includes the Soak default plugins, core libraries and other modifications.

## Installation

### Composer

The recommended installation approach is to use composer. This will ensure folders and dependencies are installed
as part of the project creation process. The command to run is:

```shell script
composer create-project soak/soak-flow --repository-url=https://satis.soak.co.uk --prefer-dist ./project-name
```

You will need to authorized to use the Soak Satis repository before you can install the project this way.

### Manually

To install Flow manually follow these steps:

1. Find the latest tag on the [Downloads](https://bitbucket.org/soak/soak-flow/downloads/?tab=tags) page.
2. Unzip the downloaded file to the desired project location
3. Navigate to the project location using the terminal
4. Install dependencies with `composer install`.


## Plugins

### Must Use

- Advanced Custom Fields PRO
- Redis Object Cache
- Simple History
- Soak Flow Core
- Soak Image Resize
- WordPress Sentry
- Yoast SEO

## Optional

- Advanced Forms
- Google Tag Manager for Wordpress
- Query Monitor
- Site Kit by Google
