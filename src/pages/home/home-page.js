import { html, LitElement } from 'lit';
import { map } from 'lit/directives/map.js';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import { PageMixin } from '@open-cells/page-mixin';
import styles from './home-page.css.js';
import '@material/web/button/outlined-button.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/outlined-icon-button.js';
import '@material/web/progress/circular-progress.js';
import '@material/web/list/list-item.js';
import '@material/web/list/list.js';
import '../../components/page-layout/page-layout.js';
import '../../components/page-layout/page-layout.js';
import {
  getRandomCocktail,
  getCategoriesList,
} from '../../services/http/index.js';

export class HomePage extends PageTransitionsMixin(PageMixin(LitElement)) {
  static get is() {
    return 'home-page';
  }

  static get styles() {
    return [styles];
  }

  static get properties() {
    return {
      _randomCocktail: { type: Object },
      _categoriesList: { type: Array },
      _likedCocktails: { type: Object },
    };
  }

  constructor() {
    super();
    this._layout = null;
    this._randomCocktail = null;
    this._categoriesList = null;
    this._likedCocktails = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.subscribe('random-cocktail', (data) => {
      this._randomCocktail = data;
    });
    this.subscribe('categories', (data) => {
      this._categoriesList = data;
    });
    this.subscribe('liked-cocktails', (data) => {
      this._likedCocktails = data;
    });
    this.requestUpdate();
  }

  disconnectedCallback() {
    this.unsubscribe('random-cocktail');
    this.unsubscribe('categories');
    this.unsubscribe('liked-cocktails');
    super.disconnectedCallback();
  }

  async firstUpdated(props) {
    super.firstUpdated?.(props);

    if (!this._randomCocktail) {
      const cocktail = await getRandomCocktail();
      this.publish('random-cocktail', cocktail?.drinks?.[0]);
    }

    if (!this._categoriesList) {
      const { drinks } = await getCategoriesList();
      drinks.sort((a, b) => a.strCategory.localeCompare(b.strCategory));
      this.publish('categories', drinks);
    }

    this._layout = this.querySelector('page-layout');
  }

  render() {
    return html`
      <page-layout>
        <div class="home-header">
          ${this._homeHeaderTpl}
        </div>

        <div class="banner">
          ${this._randomCocktail
            ? html`${this._bannerTpl}`
            : html`
                <md-circular-progress
                  aria-label="Loading..."
                  value="0.5"
                  indeterminate
                ></md-circular-progress>
              `}
        </div>

        <div class="cocktails-categories">
          <h3>Categories</h3>
          ${this._categoriesList
            ? html`${this._categoriesTpl}`
            : html`
                <md-circular-progress
                  aria-label="Loading..."
                  value="0.5"
                  indeterminate
                ></md-circular-progress>
              `}
        </div>
      </page-layout>
    `;
  }

  get _homeHeaderTpl() {
    return html`
      <h2>Welcome to Cells Cocktails. A very spirit app</h2>
      <md-outlined-button
        aria-label="Favorite Cocktails"
        @click="${(ev) => this._navigateTo(ev, 'favorite-cocktails', {})}"
      >
        <md-icon filled slot="icon">favorite</md-icon>
        ${this._likedCocktails?.size}
        <span class="md-outlined-button-text">Favorite cocktails</span>
      </md-outlined-button>
    `;
  }

  get _bannerTpl() {
    return html`
      <div class="img-container">
        <img
          src="${this._randomCocktail?.strDrinkThumb || ''}"
          alt="${this._randomCocktail?.strDrink || ''}"
        />
      </div>

      <div class="banner-text">
        <div class="banner-text-heading">
          <p class="heading-h3">Daily special</p>
          <a
            class="cocktail-title"
            @click="${(ev) =>
              this._randomCocktail && this._navigateTo(ev, 'cocktail', { cocktailId: this._randomCocktail?.idDrink})}"
            >${this._randomCocktail?.strDrink}</a
          >
        </div>

        <div class="banner-text-actions">
          <md-outlined-button
            aria-label="${this._randomCocktail?.strCategory} category"
            @click="${(ev) =>
              this._randomCocktail?.strCategory &&
              this._navigateTo(ev, 'category', { category: encodeURIComponent(this._randomCocktail?.strCategory.toLowerCase()) })}"
          >
            ${this._randomCocktail?.strCategory}
          </md-outlined-button>

          <md-outlined-icon-button
            aria-label="Add cocktail to favorite"
            toggle
            @click="${(ev) =>
              this._randomCocktail && this._addLikedCocktails(ev, this._randomCocktail)}"
            ?selected="${Boolean(
              this._likedCocktails
                ? [...this._likedCocktails].find(item => item.idDrink === this._randomCocktail?.idDrink)
                : false,
            )}"
          >
            <md-icon>favorite</md-icon>
            <md-icon slot="selected" filled>favorite</md-icon>
          </md-outlined-icon-button>
        </div>
      </div>
    `;
  }

  get _categoriesTpl() {
    return html`
      <md-list aria-label="Recipes Categories" class="categories-list">
        ${map(
          this._categoriesList || [],
          item => html`
            <md-list-item
              type="link"
              class="category-item"
              @click="${(ev) =>
                this._navigateTo(ev, 'category', { category: encodeURIComponent(item.strCategory.toLowerCase()) })}"
            >
              <img class="category-image" slot="start" src="${item.strCategoryThumb}" alt="" />
              <p>${item.strCategory}</p>
            </md-list-item>
          `,
        )}
      </md-list>
    `;
  }

  _navigateTo(ev, destination, params = {}) {
    ev.preventDefault();
    ev.stopPropagation();
    this.navigate(destination, params);
  }

  _addLikedCocktails(ev, cocktail) {
    if (!this._likedCocktails) {
      return;
    }
    ev.target.selected
      ? this._likedCocktails?.add(cocktail)
      : this._delete(cocktail, this._likedCocktails);
    this.publish('liked-cocktails', this._likedCocktails);
    this.requestUpdate();
  }

  _delete(cocktail, set) {
    for (const item of set) {
      if (item.idDrink === cocktail.idDrink) {
        set.delete(item);
      }
    }
  }

  onPageLeave() {
    this._layout?.resetScroll();
  }
}

// Definir el custom element
customElements.define(HomePage.is, HomePage);