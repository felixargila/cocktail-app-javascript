import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { PageMixin } from '@open-cells/page-mixin';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import styles from './category-page.css.js';
import '../../components/page-layout/page-layout.js';
import '../../components/page-header/page-header.js';

export class CategoryPage extends PageTransitionsMixin(PageMixin(LitElement)) {
  static get is() {
    return 'category-page';
  }

  static get properties() {
    return {
      _currentCategory: { type: String }
    };
  }

  constructor() {
    super();
    this.pageController = new PageController(this);
    this._layout = null;
    this._currentCategory = null;
    this.params = {};
  }

  static get styles() {
    return [styles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  willUpdate(props) {
    super.willUpdate?.(props);
    if (props.has('params')) {
      this.setCategory();
    }
    this.requestUpdate();
  }

  firstUpdated(props) {
    super.firstUpdated?.(props);

    this._layout = this.querySelector('page-layout');
    this.requestUpdate();
  }

  async setCategory() {
    this._currentCategory = this.params.category ? decodeURIComponent(this.params.category) : '';
  }

  render() {
    return html`
      <page-layout>
        ${this._headerTpl} 
        <p>Category: ${this._currentCategory}</p>
      </page-layout>
    `;
  }

  get _headerTpl() {
    return html`
      <page-header
        navigateToHome=""
        .likedCocktailsCount="${this._likedCocktails?.size || 0}"
        headerTitle="Dummy category title"
        @navigate-to="${(ev) => this._navigateTo(ev, ev.detail.destination, ev.detail.params)}"
      >
        <p class="categories-description">
            Category description goes here.
        </p>
      </page-header>
    `;
  }

  _navigateTo(ev, destination, params = {}) {
    ev.preventDefault();
    ev.stopPropagation();
    this.navigate(destination, params);
  }

  onPageLeave() {
    this._layout?.resetScroll();
  }
}

customElements.define(CategoryPage.is, CategoryPage);
