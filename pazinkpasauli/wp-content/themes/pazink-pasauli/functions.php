<?php
//require_once "_post_types.php";
/**
 * Add dist to the theme on setup.
 * Initial styles, js, theme setting here.
 */
add_action('after_setup_theme', function () {
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');

    register_nav_menus(array(
        'main' => __('Primary', 'Menu'),
    ));
});
/**
 * Set style and script
 */
function photography_script_enqueue() {
//    wp_enqueue_style('styles', get_template_directory_uri() .'/css/styles.css', array(), '0.0.1', 'all');
//    wp_enqueue_script('components', get_template_directory_uri() .'/js/components.js', array(), '0.0.1', true);
//    wp_enqueue_script('mainjs', get_template_directory_uri() .'/js/mainjs.js', array(), '0.0.1', true);
}
add_action('wp_enqueue_scripts', 'photography_script_enqueue');

//  REST API section

// REST API
function my_studia_api_callback() {
    $args = [
        'post_type' => 'post',
    ];

    $posts = get_posts($args);
    $data = [];
    $i = 0;
    foreach($posts as $post) {
        $post_category =  get_the_category($post->ID);
        $data[$i]['id'] = $post->ID;
        $data[$i]['title'] = $post->post_title;
        $data[$i]['slug'] = $post->post_name;
        $data[$i]['category'] = $post_category[0]->cat_ID;
        $data[$i]['image'] = get_the_post_thumbnail($post->ID);
        $data[$i]['description'] = get_the_content(null, false, $post->ID);
        $data[$i]['cat_details'] = $post_category;
        $i++;
    }
    return $data;
}

// register_rest_route callback of rest_api_init to avoid
// doing extra work when API isn't loaded
// vendor is typically plugin or theme slug

add_action('rest_api_init', function() {
    register_rest_route('studia/v1', 'posts', [
        'methods' => 'GET',
        'callback' => 'my_studia_api_callback',
    ]);
});
