export default class DarkThemeView {
  #themeToggleDarkIcon;
  // = document.getElementById('theme-toggle-dark-icon');
  #themeToggleLightIcon;
  // = document.getElementById('theme-toggle-light-icon');
  #themeToggleBtn;
  // = document.getElementById('theme-toggle');
  constructor() {
    this.#themeToggleBtn = document.getElementById('theme-toggle');
    this.#themeToggleLightIcon = document.getElementById(
      'theme-toggle-light-icon'
    );
    this.#themeToggleDarkIcon = document.getElementById(
      'theme-toggle-dark-icon'
    );
    this.addHandlerToggleDarkMode();
    this.init();
  }

  init() {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      console.log(this.#themeToggleLightIcon);
      this.#themeToggleLightIcon.classList.remove('hidden');
    } else {
      this.#themeToggleDarkIcon.classList.remove('hidden');
    }
  }

  addHandlerToggleDarkMode() {
    this.#themeToggleBtn.addEventListener(
      'click',
      function () {
        // toggle icons inside button
        this.#themeToggleDarkIcon.classList.toggle('hidden');
        this.#themeToggleLightIcon.classList.toggle('hidden');

        // if set via local storage previously
        if (localStorage.getItem('color-theme')) {
          if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
          } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
          }

          // if NOT set via local storage previously
        } else {
          if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
          } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
          }
        }
      }.bind(this)
    );
  }
}
