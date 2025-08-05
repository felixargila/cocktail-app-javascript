import { html, LitElement, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import { PageMixin } from '@open-cells/page-mixin';
import { PageController } from '@open-cells/page-controller';
import styles from './category-page.css.js';
import {
  getCategoriesList,
  getCocktailsByCategory,
} from '../../services/http/index.js';
import '@material/web/button/outlined-button.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/outlined-icon-button.js';
import '@material/web/progress/circular-progress.js';
import '../../components/page-layout/page-layout.js';
import '../../components/page-header/page-header.js';

export class CategoryPage extends PageTransitionsMixin(PageMixin(LitElement)) {
  static get is() {
    return 'category-page';
  }

  static get properties() {
    return {
      _currentCategory: { type: String },
      _cocktailsList: { type: Array },
      _likedCocktails: { type: Object },
    };
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.pageController = new PageController(this);
    this._layout = null;
    this._currentCategory = null;
    this._cocktailsList = null;
    this._likedCocktails = null;
    this.params = {};
  }

  connectedCallback() {
    super.connectedCallback();
    this.subscribe('categories', (data) => {
      this._categoriesList = data;
    });
    this.subscribe('liked-cocktails', (data) => {
      this._likedCocktails = data;
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    this.unsubscribe('categories');
    this.unsubscribe('liked-cocktails');
    super.disconnectedCallback();
  }

  willUpdate(props) {
    super.willUpdate?.(props);
    if (props.has('params') && this._categoriesList) {
      this.setCategory();
    }
  }

  async firstUpdated(props) {
    super.firstUpdated?.(props);

    if (!this._categoriesList) {
      const { drinks } = await getCategoriesList();
      this._categoriesList = drinks;
      this.publish('categories', drinks);
    }
    this.setCategory();

    this._layout = this.querySelector('page-layout');
    this.requestUpdate();
  }

  async setCategory() {
    const decodedCategory = this.params.category ? decodeURIComponent(this.params.category) : '';
    this._currentCategory = this._categoriesList?.find(
      (category) =>
        category.strCategory?.toLowerCase() === decodedCategory.toLowerCase(),
    ) || null;
    if (this._currentCategory) {
      this._getCurrentCategoryCocktails(this._currentCategory.strCategory);
    }
  }

  async _getCurrentCategoryCocktails(categoryName) {
    console.log('[_getCurrentCategoryCocktails] categoryName:', categoryName);
    if (this._cocktailsList?.[categoryName] || !categoryName) {
      return;
    }

    this._cocktailsList = null;
    const cocktails = await getCocktailsByCategory(categoryName);

    this._cocktailsList = {
      ...(this._cocktailsList || {}),
      [categoryName]: cocktails.drinks,
    };
    console.log('[_getCurrentCategoryCocktails] _cocktailsList:', this._cocktailsList);
    this.requestUpdate();
  }

  render() {
    return html`
      <page-layout>
        ${this._currentCategory
          ? html` ${this._headerTpl} ${this._categoriesTpl} `
          : html`
              <md-circular-progress
                aria-label="Loading..."
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
        headerTitle="${ifDefined(this._currentCategory?.strCategory)}"
        @navigate-to="${(ev) => this._navigateTo(ev, ev.detail.destination, ev.detail.params)}"
      >
        ${this._currentCategory?.strCategoryDescription ? html`
          <p class="categories-description">
              ${this._currentCategory?.strCategoryDescription || ''}
          </p>
        `: nothing}
      </page-header>
    `;
  }

  get _categoriesTpl() {
    return html`
      ${this._currentCategory && this._cocktailsList?.[this._currentCategory.strCategory]
        ? html`
          <ul class="page-categories categories-list">
              ${this._cocktailsList &&
              this._currentCategory &&
              this._cocktailsList[this._currentCategory.strCategory]?.map(
                (cocktail) => html`
                  <li class="category">
                    <div class="img-container">
                      <img src="${cocktail.strDrinkThumb}" alt="" />
                    </div>
                    <a
                      class="recipe-title"
                      @click="${(ev) => this._navigateTo(ev, 'cocktail', {cocktailId: cocktail.idDrink})}"
                    >
                      ${cocktail.strDrink}
                    </a>
                    <md-outlined-icon-button
                      md-outlined-icon-button
                      aria-label="Add receipe to favorite"
                      toggle
                      @click="${(ev) => this._addLikedCocktails(ev, cocktail)}"
                      ?selected="${Boolean(
                        [...this._likedCocktails || []].find(item => item.idDrink === cocktail.idDrink),
                      )}"
                    >
                      <md-icon>favorite</md-icon>
                      <md-icon slot="selected" filled>favorite</md-icon>
                    </md-outlined-icon-button>
                  </li>
                `)}
          </ul>
          `
        : html`
          <md-circular-progress
            aria-label="Loading..."
            value="0.5"
            indeterminate
          ></md-circular-progress>
        `
      }
    `;
  }

  _navigateTo(ev, destination, params = {}) {
    ev.preventDefault();
    ev.stopPropagation();
    this.navigate(destination, params);
  }

  async _addLikedCocktails(ev, cocktail) {
    if (!this._likedCocktails) {
      return;
    }

    ev.target.selected
      ? this._likedCocktails?.add({...cocktail, strCategory: this._currentCategory?.strCategory || ''})
      : this._delete(cocktail.idDrink, this._likedCocktails);
    this.publish('liked-cocktails', this._likedCocktails);
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

customElements.define(CategoryPage.is, CategoryPage);
