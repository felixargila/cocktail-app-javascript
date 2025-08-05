import { html, LitElement, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '@material/web/button/outlined-button.js';
import '@material/web/icon/icon.js';
import { styles } from './page-header.css.js';

export class PageHeader extends LitElement {
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
                  aria-label="Back to Home"
                  @click="${(ev) => this._navigateTo(ev, 'home')}"
                >
                  <md-icon filled slot="icon">arrow_back</md-icon>
                  <span class="md-outlined-button-text">Back to Home</span>
                </md-outlined-button>
              </li>
            ` : nothing
          }

        ${this.likedCocktailsCount > -1 ?
            html`
              <li>
                <md-outlined-button
                  aria-label="${ifDefined('Favorite cocktails' || undefined)}"
                  href="#!/favorite-cocktails"
                  @click="${(ev) => this._navigateTo(ev, 'favorite-cocktails', {})}"
                >
                  <md-icon filled slot="icon">favorite</md-icon>
                  ${this.likedCocktailsCount}
                  <span class="md-outlined-button-text">Favorite cocktails</span>
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
