import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    button,
    drawer,
    content,
  }) {
    this.buttonn = button;
    this.drawerr = drawer;
    this.contentt = content;
    this.initialAppShell();
  }

  initialAppShell() {
    DrawerInitiator.init({
      button: this.buttonn,
      drawer: this.drawerr,
      content: this.contentt,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this.contentt.innerHTML = await page.render();
    await page.afterRender();
    const skipLinkElem = document.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#content').focus();
    });
  }
}

export default App;
