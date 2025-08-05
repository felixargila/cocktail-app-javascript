import { startApp } from '@open-cells/core';
import { LitElement, html } from 'lit';
import { ElementController } from '@open-cells/element-controller';
import { routes } from '../../router/routes.js';
import styles from './app-index.css.js';
import { appConfig } from '../../config/app.config.js';
import '@open-cells/page-transitions/page-transition-head-styles.js';
import '@material/web/icon/icon.js';

startApp({
  routes,
  mainNode: 'app-content',
  viewLimit: 1,
  persistentPages: [],
  appConfig,
  commonPages: []
});

export class AppIndex extends LitElement {
  static get is() {
    return 'app-index';
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.elementController = new ElementController(this);
    this._header = null;
    this._root = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.elementController.subscribe('scroll', (data) => this._headerTransition(data));
  }

  firstUpdated(props) {
    super.firstUpdated(props);

    this._header = this.shadowRoot?.querySelector('header');
    this._root = document.querySelector(':root');
  }

  render() {
    return html`
      ${this._headerTpl}
      <main role="main" tabindex="-1">
        <slot></slot>
      </main>
    `;
  }

  get _headerTpl() {
    return html`
      <header>
        <div class="header-content">
          <div class="header-logo">
            <md-icon>local_bar</md-icon>
            <h1><a href="#!/">Cells Cocktails</a></h1>
          </div>
        </div>
      </header>
    `;
  }

  _headerTransition(data) {
    if (data.scrollTop > 0) {
      this._header?.classList.add('scrolled');
    } else {
      this._header?.classList.remove('scrolled');
    }
  }
}

// Definir el custom element
customElements.define(AppIndex.is, AppIndex);