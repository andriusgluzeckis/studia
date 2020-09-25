<?php get_header(); ?>

<?php if (is_404() || is_search()): ?>
  <div class="error-block">
    <div class="error-block__wrap">
      <h1 class="error-block__title"><?php the_field('404_message', 'options'); ?></h1>
    </div>
  </div>
<?php else: ?>
    <?php get_template_part('_flex-content/_content'); ?>
<?php endif; ?>

<?php get_footer(); ?>
