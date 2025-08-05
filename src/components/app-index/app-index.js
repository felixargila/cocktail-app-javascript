import { startApp } from '@open-cells/core';
import { LitElement, html } from 'lit';
import { ElementController } from '@open-cells/element-controller';
import { routes } from '../../router/routes.js';
import styles from './app-index.css.js';
import { appConfig } from '../../config/app.config.js';

startApp({
  routes,
  mainNode: 'app-content',
  viewLimit: 2,
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
    this._root = null;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated(props) {
    super.firstUpdated(props);

    this._root = document.querySelector(':root');
  }

  render() {
    return html`
      <main role="main" tabindex="-1">
        <slot></slot>
      </main>
    `;
  }
}

// Definir el custom element
customElements.define(AppIndex.is, AppIndex);