(function(EVELINA, $, undefined) {
  'use strict';

  /** Public variables **/

  EVELINA.timeouts = []; // All timeouts should be appended to this array, makes for easy clearing
  EVELINA.WEB_ROOT = ((document.location.protocol === 'https:') ? 'https://' : 'http://') + document.location.host + '/templates';
  EVELINA.lang = 'en';
  EVELINA.loading = false;

}(window.EVELINA = window.EVELINA || {}, jQuery));

$(function() {
  'use strict';
  EVELINA.devmenu.init();
});

