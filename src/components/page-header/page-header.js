import { html, LitElement, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LocalizeMixin } from '@open-cells/localize';
import '@material/web/button/outlined-button.js';
import '@material/web/icon/icon.js';
import { styles } from './page-header.css.js';
import i18nKeys from './page-header-i18n.js';

export class PageHeader extends LocalizeMixin(LitElement) {
  static styles = styles;

  static get properties() {
    return {
      navigateToHome: { type: Boolean },
      likedCocktailsCount: { type: Number },
      headerTitle: { type: String }
    };
  }

  constructor() {
    super();
    this.navigateToHome = false;
    this.likedCocktailsCount = -1;
    this.headerTitle = '';
  }

  render() {
    return html`
      <ul class="page-header-sup">
        ${this.navigateToHome ?
            html`
              <li>
                <md-outlined-button
                  aria-label="${ifDefined(this.t(i18nKeys.options.backToHome) || undefined)}"
                  @click="${(ev) => this._navigateTo(ev, 'home')}"
                >
                  <md-icon filled slot="icon">arrow_back</md-icon>
                  <span class="md-outlined-button-text">${this.t(i18nKeys.options.backToHome)}</span>
                </md-outlined-button>
              </li>
            ` : nothing
          }

        ${this.likedCocktailsCount > -1 ?
            html`
              <li>
                <md-outlined-button
                  aria-label="${ifDefined(this.t(i18nKeys.options.favoriteCocktails) || undefined)}"
                  href="#!/favorite-cocktails"
                  @click="${(ev) => this._navigateTo(ev, 'favorite-cocktails', {})}"
                >
                  <md-icon filled slot="icon">favorite</md-icon>
                  ${this.likedCocktailsCount}
                  <span class="md-outlined-button-text">${this.t(i18nKeys.options.favoriteCocktails)}</span>
                </md-outlined-button>
              </li>
            ` : nothing
          }
      </ul>

      <h2>${this.headerTitle}</h2>

      <slot></slot>
    `;
  }

  _navigateTo(ev, destination, params = {}) {
    // Emitir evento personalizado para que el componente padre maneje la navegación
    this.dispatchEvent(new CustomEvent('navigate-to', {
      bubbles: true,
      composed: false,
      detail: {
        destination,
        params
      }
    }));
  }
}

// Definir el custom element
customElements.define('page-header', PageHeader);
