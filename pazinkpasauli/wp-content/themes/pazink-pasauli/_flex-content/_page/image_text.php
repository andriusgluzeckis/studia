<?php $items = get_sub_field('prekes'); ?>
<section class="image-text" data-aos="fade-up">
    <div class="image-text__inner">
        <?php if (have_rows('prekes')) : ?>
            <?php foreach ($items as $preke) :
                $textas = $preke['text'];
                $paveiksliukas = esc_url($preke['image']['url']);
                $pavadinimas = esc_attr($preke['image']['alt']);
                ?>
                <div class="image-text__item">
                    <div class="image-text__image-container">
                        <img class="image-text__image" src="<?php echo $paveiksliukas?>" alt="<?php echo $pavadinimas; ?>">
                    </div>
                    <div class="image-text__text--text editorial-content">
                        <?php echo $textas; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
</section>
