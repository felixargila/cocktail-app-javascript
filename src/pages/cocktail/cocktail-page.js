import { html, LitElement, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { PageController } from '@open-cells/page-controller';
import { PageMixin } from '@open-cells/page-mixin';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import styles from './cocktail-page.css.js';
import { getFullCocktailDetails } from '../../services/http/index.js';
import '@material/web/button/outlined-button.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/outlined-icon-button.js';
import '@material/web/progress/circular-progress.js';
import '../../components/page-layout/page-layout.js';
import '../../components/page-header/page-header.js';

export class CocktailPage extends PageTransitionsMixin(PageMixin(LitElement)) {
  static get is() {
    return 'cocktail-page';
  }

  static get properties() {
    return {
      pageController: { type: Object },
      _cocktailInstructions: { type: Array },
      _cocktail: { type: Object },
      _likedCocktails: { type: Object },
      params: { type: Object },
    };
  }

  constructor() {
    super();
    this.pageController = new PageController(this);
    this._cocktailInstructions = [];
    this._cocktail = null;
    this._likedCocktails = null;
    this._layout = null;
    this.params = {};
  }

  static get styles() {
    return [styles];
  }

  connectedCallback() {
    super.connectedCallback();

    this.pageController.subscribe('liked-cocktails', (data) => {
      this._likedCocktails = data;
    });
  }

  disconnectedCallback() {
    this.pageController.unsubscribe('liked-cocktails');
    super.disconnectedCallback();
  }

  willUpdate(props) {
    super.willUpdate?.(props);
    // Actualizar instrucciones cuando cambia el cocktail
    if (props.has('_cocktail') && this._cocktail) {
      this._updateInstructionsByLanguage();
    }
  }

  firstUpdated(props) {
    super.firstUpdated?.(props);

    this._layout = this.querySelector('page-layout');
  }

  async updated(props) {
    super.updated?.(props);

    if (props.has('params') && this.params.cocktailId) {
      if (this.params.cocktailId === props.get('params').cocktailId) {
        return;
      }

      this._cocktail = null;
      const cocktail = await getFullCocktailDetails(this.params.cocktailId);
      this._cocktail = cocktail.drinks[0];
      // Actualizar instrucciones según el idioma actual después de cargar el cocktail
      if (this._cocktail) {
        this._updateInstructionsByLanguage();
      }
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <page-layout>
        ${this._cocktail
          ? html` ${this._headerTpl} ${this._cocktailTpl} `
          : html`
            <md-circular-progress
              aria-label="${'Loading...'}"
              value="0.5"
              indeterminate
            ></md-circular-progress>
          `}
      </page-layout>
    `;
  }

  get _headerTpl() {
    return html`
      <page-header
        navigateToHome=""
        .likedCocktailsCount="${this._likedCocktails?.size || 0}"
        headerTitle="${ifDefined(this._cocktail?.strDrink)}"
        @navigate-to="${(ev) => this._handleNavigateTo(ev.detail.destination, ev.detail.category)}"
      >
        <div class="page-header-actions">
          <md-outlined-button
            aria-label="${this._cocktail?.strCategory} category"
            @click="${() =>
              this._cocktail?.strCategory &&
              this._handleNavigateTo('category', encodeURIComponent(this._cocktail?.strCategory.toLowerCase()))}"
          >
            ${this._cocktail?.strCategory}
          </md-outlined-button>
    
          <md-outlined-icon-button
            aria-label="${'Add to favorites'}"
            toggle
            @click="${(ev) => this._cocktail && this._addLikedCocktails(ev, this._cocktail)}"
            ?selected="${this._likedCocktails
              ? Boolean([...this._likedCocktails].find(item => item.idDrink === this._cocktail?.idDrink))
              : false}"
          >
            <md-icon>favorite</md-icon>
            <md-icon slot="selected" filled>favorite</md-icon>
          </md-outlined-icon-button>
        </div>
      </page-header>
    `;
  }

  get _cocktailTpl() {
    return html`
      <div class="cocktail-ingredients">
        <div class="cocktail-img">
          <img src="${this._cocktail?.strDrinkThumb || ''}" alt="" />
        </div>

        <div class="ingredients-list">
          <h3>${'Ingredients'}</h3>
          <ul>
            ${this._cocktail
              ? Object.keys(this._cocktail)
                  .filter(
                    (key) =>
                      key.includes('strIngredient') && this._cocktail && this._cocktail[key],
                  )
                  .map(
                    key => html`
                      <li>
                        <p>${this._cocktail ? this._cocktail[key] : nothing}</p>
                        <p>
                          ${this._cocktail
                            ? this._cocktail[`strMeasure${key.split('strIngredient')[1]}`]
                            : nothing}
                        </p>
                      </li>
                    `,
                  )
              : nothing}
          </ul>

          ${this._cocktail?.strYoutube
            ? this._linkToYoutube(this._cocktail.strYoutube)
            : nothing}
        </div>

        <div class="cocktail-instructions">
          <h3>${'Instructions'}</h3>
          ${this._cocktailInstructions.map(instruction => html` <p>${instruction}</p> `)}
        </div>
      </div>
    `;
  }

  _linkToYoutube(strYoutube) {
    return html`
      <a 
        class="youtube" 
        href="${strYoutube}" 
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${this.t(i18nKeys.seeOnYouTube) || 'See recipe on YouTube'}"
      >
        <md-icon filled>smart_display</md-icon>
        ${this.t(i18nKeys.seeOnYouTube) || 'See recipe on YouTube'}
      </a>
    `;
  }

  _handleNavigateTo(destination, category) {
    this.pageController.navigate(destination, { category });
  }

  _addLikedCocktails(ev, cocktail) {
    if (!this._likedCocktails) {
      return;
    }
    ev.target.selected
      ? this._likedCocktails?.add(cocktail)
      : this._delete(cocktail, this._likedCocktails);

    this.pageController.publish('liked-cocktails', this._likedCocktails);
    this.requestUpdate();
  }

  _delete(cocktail, set) {
    for (const item of set) {
      if (item.idDrink === cocktail.idDrink) {
        set.delete(item);
      }
    }
  }

  _updateInstructionsByLanguage() {
    if (!this._cocktail) return;
    
    // Seleccionar las instrucciones según el idioma actual
    let instructions = this._cocktail.strInstructions; // inglés por defecto
    
    this._cocktailInstructions = instructions.split('\n');
  }

  onPageLeave() {
    this._layout?.resetScroll();
  }
}

customElements.define(CocktailPage.is, CocktailPage);
