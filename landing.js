(() => {
  'use strict';

  // Centralizes the workspace destination; navigation never starts a model task.
  const configuration = { workspaceUrl: 'gallery.html' };
  document.querySelectorAll('[data-workspace-link]').forEach((link) => {
    link.href = configuration.workspaceUrl;
  });

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  if (!menuButton || !navigation) return;
  document.documentElement.classList.add('js-enabled');

  // Keeps the mobile navigation and its accessible state synchronized.
  function setMenuOpen(isOpen) {
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? '关闭导航菜单' : '展开导航菜单');
    navigation.classList.toggle('is-open', isOpen);
  }

  // Closes the mobile menu after choosing any in-page destination.
  function closeAfterNavigation(event) {
    if (event.target.closest('a')) setMenuOpen(false);
  }

  // Restores focus to the menu trigger when Escape dismisses the menu.
  function handleMenuEscape(event) {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  }

  menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', closeAfterNavigation);
  document.addEventListener('keydown', handleMenuEscape);
  window.matchMedia('(min-width: 761px)').addEventListener('change', () => setMenuOpen(false));
})();
