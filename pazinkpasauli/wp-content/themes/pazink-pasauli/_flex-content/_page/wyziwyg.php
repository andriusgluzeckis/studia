<?php
$wysiwygContent = get_sub_field('wysiwyg_content');
?>
<div class="wysiwyg">
    <div class="wysiwyg__wrapper">
        <?php if ($wysiwygContent) : ?>
            <div class="wysiwyg__content editorial-content"><?php echo $wysiwygContent; ?></div>
        <?php endif; ?>
    </div>
</div>
