import 'regenerator-runtime';
// css
import '../styles/main.css';
import '../styles/list.css';
import '../styles/responsive.css';
import '../styles/detail.css';

// js
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#menu_toggle'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('main'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
