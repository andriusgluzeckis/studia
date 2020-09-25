(function(EVELINA) {
  'use strict';
  var state = false;

  function Header(container) {
    var activeMenuClass = 'menu__active';
    const burgerMenu = container.querySelector('.js-burger-menu');
    const headerTitle = container.querySelector('.js-header-title');
    const headerTitleInner = headerTitle.firstElementChild;
    const titleInnerWidth = headerTitle.firstElementChild.scrollWidth;
    const titleInnerHeight = headerTitle.firstElementChild.scrollHeight;
    const navigation = container.querySelector('.js-nav');
    let menu;
    let menuHeight;
    if (navigation) {
      menu = navigation.querySelector('.menu');
    }
    const navigationInnerWidth = navigation.firstElementChild.scrollWidth;

    if (!state) {
      headerTitle.style.width = `${titleInnerWidth}px`;
    }

    function open() {
      if (window.innerWidth > 900) {
        headerTitle.style.width = '0px';
        navigation.style.width = '100%';
        navigation.style.width = `${navigationInnerWidth}px`;
        menu.style.height = 'auto';
      } else {
        setTimeout(function () {
          menu.style.height = menuHeight;
        }, 150);
        headerTitleInner.style.height = '0px';
      }
      burgerMenu.classList.add(activeMenuClass);
      state = true;
    }

    function close() {
      if (window.innerWidth > 900) {
        headerTitle.style.width = `${titleInnerWidth}px`;
        navigation.style.width = '0px';
      } else {
        menu.style.height = '0px';
        setTimeout(function () {
          headerTitleInner.style.height = `${titleInnerHeight}px`;
        }, 300);
      }
      burgerMenu.classList.remove(activeMenuClass);
      state = false;
    }

    function toggle() {
      if (state === true) {
        close();
      } else {
        open();
      }
    }

    function resize() {
      if (window.innerWidth < 900) {
        headerTitle.style.width = '100%';
        navigation.style.width = '100%';
      } else {

      }
    }

    function handleBurgerClicked(event) {
      event.preventDefault();
      menuHeight = window.innerWidth > 900 ? menuHeight = `${menu.scrollHeight}px` : '100vh';
      console.log(menuHeight);
      toggle();
    }

    window.addEventListener('resize', function () {
      close();
      resize();
    });

    burgerMenu.addEventListener('click', function(event) {
      handleBurgerClicked(event);
    });

    resize();
  }

  EVELINA.devmenu = {
    initialisedHeaders: [],
    init: function() {
      const header = document.querySelector('.js-header');
      if (header) {
        EVELINA.devmenu.initialisedHeaders.push(new Header(header));
      }
    }
  };
}(window.EVELINA = window.EVELINA || {}, jQuery));
