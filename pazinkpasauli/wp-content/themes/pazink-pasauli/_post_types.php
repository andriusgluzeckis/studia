<?php

/**
 * Register custom taxonomies.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_taxonomy
 */
add_action('init', function() {
    // configure the taxonomies
    $taxonomies = [
//        'post_tags' => [
//            'plural'    => 'Tags',
//            'singular'  => 'Tag',
//            'rewrite'   => false,
//            'hierarchical' => false, // true, behaves like categories. false, single level tags
//        ],
    ];

    // Register each taxonomy
	foreach ($taxonomies as $tax => $options) {
    	register_taxonomy($tax, null, [
            'hierarchical'      => $options['hierarchical'] ?? false,
            'labels'            => [
                'name'              => _x($options['plural'], 'taxonomy general name', 'siege-of-terra'),
                'singular_name'     => _x($options['singular'], 'taxonomy singular name', 'siege-of-terra'),
                'search_items'      => __('Search Genres', 'siege-of-terra'),
                'all_items'         => __('All Genres', 'siege-of-terra'),
                'parent_item'       => __('Parent ' . $options['singular'], 'siege-of-terra'),
                'parent_item_colon' => __('Parent ' . $options['singular'] . ':', 'siege-of-terra'),
                'edit_item'         => __('Edit '. $options['singular'], 'siege-of-terra'),
                'update_item'       => __('Update '. $options['singular'], 'siege-of-terra'),
                'add_new_item'      => __('Add New '. $options['singular'], 'siege-of-terra'),
                'new_item_name'     => __('New ' . $options['singular'] .' Name', 'siege-of-terra'),
                'menu_name'         => __($options['singular'], 'siege-of-terra'),
            ],
            'show_ui'           => $options['show_ui'] ?? true,
            'show_admin_column' => $options['show_admin_column'] ?? true,
            'query_var'         => $options['query_var'] ?? true,
            'rewrite'           => $options['rewrite'] ?? false,
        ]);
    }

});

/**
 * Register a collection of custom post types.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_post_type
 */
add_action('init', function() {
    // Configure post types
    $post_types = [
        'authors' => [
            'plural'        => 'Veiklos',
            'singular'      => 'veikla',
            'description'   => '',
            'rewrite'       => ['slug' => 'veikla'],
            'supports'      => ['title', 'editor', 'thumbnail'], // 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments', 'revisions'
            'show_in_rest'  => true,
            'taxonomies'    => [],
        ]
    ];

    // Register custom post types.
    foreach ($post_types as $type => $options) {
        register_post_type($type, [
                'labels'             => [
                    'name'               => _x($options['plural'], 'post type general name', 'siege-of-terra'),
                    'singular_name'      => _x($options['singular'], 'post type singular name', 'siege-of-terra'),
                    'menu_name'          => _x($options['plural'], 'admin menu', 'siege-of-terra'),
                    'name_admin_bar'     => _x($options['singular'], 'add new on admin bar', 'siege-of-terra'),
                    'add_new'            => _x('Add New', 'book', 'siege-of-terra'),
                    'add_new_item'       => __('Add New ' . $options['singular'], 'siege-of-terra'),
                    'new_item'           => __('New ' . $options['singular'], 'siege-of-terra'),
                    'edit_item'          => __('Edit ' . $options['singular'], 'siege-of-terra'),
                    'view_item'          => __('View ' . $options['singular'], 'siege-of-terra'),
                    'all_items'          => __('All ' . $options['plural'], 'siege-of-terra'),
                    'search_items'       => __('Search ' . $options['plural'], 'siege-of-terra'),
                    'parent_item_colon'  => __('Parent ' . $options['plural'] . ':', 'siege-of-terra'),
                    'not_found'          => __('No ' . $options['plural'] .' found.', 'siege-of-terra'),
                    'not_found_in_trash' => __('No ' . $options['plural'] . ' found in Trash.', 'siege-of-terra')
                ],
                'description'        => __($options['description'], 'siege-of-terra'),
                'public'             => $options['public'] ?? true,
                'publicly_queryable' => $options['publicly_queryable'] ?? true,
                'show_ui'            => $options['show_ui'] ?? true,
                'show_in_menu'       => $options['show_in_menu'] ?? true,
                'query_var'          => $options['query_var'] ?? true,
                'rewrite'            => $options['rewrite'] ?? false,
                'capability_type'    => $options['capability_type'] ?? 'post',
                'has_archive'        => $options['has_archive'] ?? false,
                'hierarchical'       => $options['hierarchical'] ?? false,
                'menu_position'      => $options['menu_position'] ?? null,
                'supports'           => $options['supports'] ?? ['title'],
                'taxonomies'         => $options['taxonomies'] ?? [],
                'show_in_rest'       => $options['show_in_rest'] ?? false,
            ]);
    }
});
