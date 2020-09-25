<?php $id = trim(esc_html(get_sub_field('id'))); ?>
<section class="youtube">
    <div class="youtube__inner">
        <iframe src="https://www.youtube.com/embed/<?php echo $id; ?>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
    </div>
</section>
