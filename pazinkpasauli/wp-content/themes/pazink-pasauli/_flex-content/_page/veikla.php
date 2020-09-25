<?php
$args = [
    'post_type' => 'veikla'
];

$veikla_query = new WP_Query($args);
var_dump($veikla_query);
?>
<h1>Veiklos query</h1>
<?php if ($veikla_query->have_posts()) : ?>
    <section class=feed">
        <?php while ($veikla_query->have_posts()) :
            $veikla_query->the_post(); ?>
        <h1>veikla kuria reikia atvaizduoti</h1>
        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>
    </section>
<?php endif; ?>
<section class="veikla">

</section>
