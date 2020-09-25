<?php

/**
 * This file contains one loop to load the components into the template.
 */

// does the current post/page have a template set? If so, use it to determine the location of template files
$page_template = get_page_template_slug();

if (!empty($page_template)) :

    // retrieve name from page template
    $page_template = str_replace('page-', '', str_replace('.php', '', $page_template));

    $template_directory = get_template_directory();
endif;

if (have_rows('_content')):
    global $_flex_counter; // Used to build a unique component class.

    while (have_rows('_content')) : the_row();
        if (!isset($_flex_counter['all'])):
            $_flex_counter['all'] = 0;
        else:
            $_flex_counter['all']++;
        endif;

        if (!isset($_flex_counter[get_row_layout()])):
            $_flex_counter[get_row_layout()] = 0;
        else:
            $_flex_counter[get_row_layout()]++;
        endif;

        if (!empty($page_template)) :

            $template_file = sprintf('%s/_flex-content/_%s/%s.php',
                $template_directory,
                $page_template,
                get_row_layout()
            );

            if (file_exists($template_file)) :
                get_template_part('_flex-content/_' . $page_template . '/' . get_row_layout());
            else:
                get_template_part('_flex-content/_page/' . get_row_layout());
            endif;
        else:
            get_template_part('_flex-content/_page/' . get_row_layout());
        endif;
    endwhile;
endif;
