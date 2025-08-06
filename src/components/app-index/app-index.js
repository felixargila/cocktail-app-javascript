import { startApp } from '@open-cells/core';
import { LitElement, html } from 'lit';
import { LocalizeMixin } from '@open-cells/localize';
import { ElementController } from '@open-cells/element-controller';
import { routes } from '../../router/routes.js';
import styles from './app-index.css.js';
import { appConfig } from '../../config/app.config.js';
import '@open-cells/page-transitions/page-transition-head-styles.js';
import '@material/web/iconbutton/outlined-icon-button.js';
import '@material/web/icon/icon.js';
import {
  availableLanguages,
  changeLanguage,
  getCurrentLanguage,
  initializeI18n
} from '../../services/i18n/i18n-setup.js';

// Inicializar i18n antes de arrancar la aplicación
initializeI18n();

startApp({
  routes,
  mainNode: 'app-content',
  viewLimit: 1,
  persistentPages: [],
  appConfig,
  commonPages: []
});

export class AppIndex extends LocalizeMixin(LitElement) {
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
    this._likedCocktails = this._getLocalStorage();
    this._currentLanguage = 'en';
  }

  connectedCallback() {
    super.connectedCallback();
    this.elementController.subscribe('scroll', (data) => this._headerTransition(data));

    this.elementController.publish('liked-cocktails', this._likedCocktails);
    this.elementController.subscribe('liked-cocktails', (data) => {
      this._setLocalStorage(data);
    });

    // Establecer idioma inicial desde Open Cells
    this._currentLanguage = getCurrentLanguage();
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
            <h1><a href="#!/">${this.t('appTitle')}</a></h1>
          </div>

          <div class="header-actions">
            <!-- Selector de idioma -->
            <select 
              class="language-selector"
              @change=${this._changeLanguage}
              .value=${this._currentLanguage}
            >
              ${availableLanguages.map(lang => html`
                <option value="${lang.code}" ?selected=${this._currentLanguage === lang.code}>
                  ${lang.nativeName}
                </option>
              `)}
            </select>
            <md-outlined-icon-button
              class="dark-mode"
              aria-label="DarkMode"
              data-mode="light"
              toggle
              @click=${() => this._toogleDarkMode()}
            >
              <md-icon>dark_mode</md-icon>
              <md-icon slot="selected">light_mode</md-icon>
            </md-outlined-icon-button>
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

  _changeLanguage(event) {
    const select = event.target;
    const newLanguage = select.value;
    
    if (newLanguage !== this._currentLanguage) {
      console.log(`🌍 Changing language from ${this._currentLanguage} to ${newLanguage}`);
      
      // Cambiar idioma usando el servicio de Open Cells
      changeLanguage(newLanguage);
      this._currentLanguage = newLanguage;
      
      // El LocalizeMixin se actualiza automáticamente gracias a updateWhenLocaleResourcesChange
    }
  }

  _toogleDarkMode() {
    this._root?.hasAttribute('color-scheme-dark')
      ? this._root?.removeAttribute('color-scheme-dark')
      : this._root?.setAttribute('color-scheme-dark', 'true');
  }

  _setLocalStorage(setItem) {
    const arrayFromSet = Array.from(setItem);
    const jsonData = JSON.stringify(arrayFromSet);
    localStorage.setItem('_likedCocktails', jsonData);
  }

  _getLocalStorage() {
    const jsonData = localStorage.getItem('_likedCocktails');
    return jsonData ? new Set(JSON.parse(jsonData)) : new Set();
  }
}

// Definir el custom element
customElements.define(AppIndex.is, AppIndex);