(function () {
  var scrollY = 0;
  var locked = false;

  function lockScroll() {
    if (locked) return;
    scrollY = window.scrollY || window.pageYOffset || 0;
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + scrollY + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.documentElement.style.overflow = 'hidden';
    locked = true;
  }

  function unlockScroll() {
    if (!locked) return;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.documentElement.style.overflow = '';
    window.scrollTo(0, scrollY);
    locked = false;
  }

  function syncState(navButton) {
    if (navButton.classList.contains('w--open')) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }

  function init() {
    var navButton = document.querySelector('.w-nav-button');
    if (!navButton) return;

    var observer = new MutationObserver(function () {
      syncState(navButton);
    });

    observer.observe(navButton, { attributes: true, attributeFilter: ['class'] });

    navButton.addEventListener('click', function () {
      setTimeout(function () {
        syncState(navButton);
      }, 50);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 991) {
        unlockScroll();
      }
    });

    window.addEventListener('pagehide', unlockScroll);
    syncState(navButton);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
