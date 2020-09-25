</main>
<footer class="footer">
    <div class="footer__inner">
        <div class="footer__copy">
            <p>2019 &copy; Evelinos krautuvele</p>
        </div>
        <div class="footer__social">
            <a href="https://www.facebook.com/ewkute/" target="_blank" rel="noopener noreferrer">
                <img src="<?php echo get_template_directory_uri(); ?>/images/facebook.svg" class="footer__fb-icon" alt="Facebook link">
                <p class="footer__fb-title">Facebook Puslapis</p>
            </a>
        </div>
    </div>
</footer>
<?php wp_footer(); ?>
<script>
    <?php include 'src/main.bundle.js'; ?>
</script>
<script>
    <?php include 'src/vendor.js'; ?>
</script>
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script>
  AOS.init();
</script>
</body>
</html>
