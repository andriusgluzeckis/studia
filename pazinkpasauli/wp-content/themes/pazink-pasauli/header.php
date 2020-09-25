<!doctype html>
<html lang="lt">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="google-site-verification" content="h273S3u2Xi9JH6K2GpbAkSD5VB8Ce1rkfXnz6pyBLGo"/>
    <style>
        <?php include 'src/main.scss'; ?>
    </style>
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<header class="header js-header">
    <div class="header__logo-burger">
        <div class="header__logo-container">
            <?php
            $logo = get_field('logo', 'options');
            $url  = !empty($logo) ? $logo['url'] : get_template_directory_uri() . '/images/logo.svg';
            $alt = !empty($logo['alt']) ? $logo['alt'] : 'logo';
            ?>
            <a href="<?php echo esc_url(home_url()); ?>" target="_self" rel="noopener noreferrer">
                <img class="header__logo" src="<?php echo esc_url($url); ?>" alt="<?php echo esc_attr($alt); ?>">
            </a>
        </div>
    </div>
    <div class="header__header">
        <div class="header__title js-header-title">
            <div class="header__title-inner">
                <h1 class="header__title-text"><?php //the_field('title', 'option');
                    echo get_the_title(); ?></h1>
            </div>
        </div>
        <?php
        wp_nav_menu(array(
            'theme_location' => 'main',
            'fallback_cb' => false,
            'container' => 'nav',
            'container_class' => 'nav-container js-nav',
        ));
        ?>
    </div>
    <div class="burger-menu">
        <a href="#" class="burger-menu__anchor js-burger-menu" aria-label="Burger menu">
            <div role="presentation" class="burger-menu__container">
                <div class="burger-menu__bar burger-menu__bar--1" role="presentation"></div>
                <div class="burger-menu__bar burger-menu__bar--2" role="presentation"></div>
                <div class="burger-menu__bar burger-menu__bar--3" role="presentation"></div>
            </div>
        </a>
    </div>
</header>
<main class="main">

