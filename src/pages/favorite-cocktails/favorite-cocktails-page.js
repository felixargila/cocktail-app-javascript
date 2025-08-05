import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { PageMixin } from '@open-cells/page-mixin';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import styles from './favorite-cocktails-page.css.js';
import '../../components/page-layout/page-layout.js';
import '../../components/page-header/page-header.js';

export class FavoriteCocktailsPage extends PageTransitionsMixin(PageMixin(LitElement)) {
  static get is() {
    return 'favorite-cocktails-page';
  }

  static get styles() {
    return [styles];
  }

  static get properties() {}
  static get properties() {
    return {
      _likedCocktails: { type: Object },
    };
  }

  constructor() {
    super();
    this.pageController = new PageController(this);
    this._likedCocktails = null;
    this._layout = null;
  }

  connectedCallback() {
    super.connectedCallback();

    this.pageController.subscribe('liked-cocktails', (data) => {
      this._likedCocktails = data;
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    this.pageController.unsubscribe('liked-cocktails');
    super.disconnectedCallback();
  }

  firstUpdated(props) {
    super.firstUpdated?.(props);

    this._layout = this.querySelector('page-layout');
  }

  render() {
    return html`
      <page-layout>
        ${this._headerTpl}
        ${this._likedCocktails && this._likedCocktails.size > 0
          ? this._likedCocktailsTpl
          : html` <p class="no-favorites">${this.t(i18nKeys.noFavorite)}</p> `}
      </page-layout>
    `;
  }

  get _headerTpl() {
    return html`
      <page-header
        navigateToHome=""
        headerTitle="Favorite Cocktails (${this._likedCocktails ? this._likedCocktails.size : 0})"
        @navigate-to="${(ev) => this._navigateTo(ev, ev.detail.destination, ev.detail.params)}"
      ></page-header>
    `;
  }

    get _likedCocktailsTpl() {
    return html`
      <ul class="page-categories categories-list">
        ${this._likedCocktails
          ? [...this._likedCocktails].map(
              cocktail => html`
                <li class="category">
                  <div class="img-container">
                    <img src="${cocktail.strDrinkThumb}" alt="" />
                  </div>

                  <a
                    class="cocktail-title"
                    @click="${(ev) => this._navigateTo(ev, 'cocktail', {cocktailId: cocktail.idDrink})}"
                  >
                    ${cocktail.strDrink}
                  </a>

                  <div class="banner-text-actions">
                    <md-outlined-button
                      aria-label="${cocktail.strCategory} category"
                      @click="${(ev) =>
                        cocktail.strCategory &&
                        this._navigateTo(ev, 'category', { category: encodeURIComponent(cocktail.strCategory.toLowerCase()) })}"
                    >
                      ${cocktail.strCategory}
                    </md-outlined-button>

                    <md-outlined-icon-button
                      aria-label="Add receipe to favorite"
                      toggle
                      @click="${(ev) => this._addLikedCocktails(ev, cocktail)}"
                      ?selected="${this._likedCocktails
                        ? Boolean(
                            [...this._likedCocktails].find(item => item.idDrink === cocktail.idDrink),
                          )
                        : false}"
                    >
                      <md-icon>favorite</md-icon>
                      <md-icon slot="selected" filled>favorite</md-icon>
                    </md-outlined-icon-button>
                  </div>
                </li>
              `,
            )
          : nothing}
      </ul>
    `;
  }

  _navigateTo(ev, destination, params = {}) {
    ev.preventDefault();
    ev.stopPropagation();
    this.pageController.navigate(
      destination,
      params
    );
  }

  _addLikedCocktails(ev, cocktail) {
    if (!this._likedCocktails) {
      return;
    }
    ev.target.selected
      ? this._likedCocktails?.add(cocktail)
      : this._delete(cocktail.idDrink, this._likedCocktails);

    this.pageController.publish('liked-cocktails', this._likedCocktails);
    this.requestUpdate();
  }

  _delete(id, set) {
    for (const item of set) {
      if (item.idDrink === id) {
        set.delete(item);
      }
    }
  }

  onPageLeave() {
    this._layout?.resetScroll();
  }
}

customElements.define(FavoriteCocktailsPage.is, FavoriteCocktailsPage);
