import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { PageMixin } from '@open-cells/page-mixin';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import styles from './cocktail-page.css.js';
import '../../components/page-layout/page-layout.js';
import '../../components/page-header/page-header.js';

export class CocktailPage extends PageTransitionsMixin(PageMixin(LitElement)) {
  static get is() {
    return 'cocktail-page';
  }

  static get properties() {
    return {
      _currentCocktail: { type: String }
    };
  }

  constructor() {
    super();
    this.pageController = new PageController(this);
    this._layout = null;
    this.params = {};
  }

  static get styles() {
    return [styles];
  }

  willUpdate(props) {
    super.willUpdate?.(props);
    if (props.has('params')) {
      this.setCocktail();
    }
    this.requestUpdate();
  }

  firstUpdated(props) {
    super.firstUpdated?.(props);

    this._layout = this.querySelector('page-layout');
    this.requestUpdate();
  }

  async setCocktail() {
    this._currentCocktail = this.params.cocktailId ? decodeURIComponent(this.params.cocktailId) : '';
  }

  render() {
    return html`
      <page-layout>
        ${this._headerTpl}
        <p>Cocktail: ${this._currentCocktail}</p>
      </page-layout>
    `;
  }

  get _headerTpl() {
    return html`
      <page-header
        navigateToHome=""
        .likedCocktailsCount="${this._likedCocktails?.size || 0}"
        headerTitle="Dummy Cocktail Title"
        @navigate-to="${(ev) => this._handleNavigateTo(ev.detail.destination, ev.detail.category)}"
      >
      </page-header>
    `;
  }

  _handleNavigateTo(destination, category) {
    this.pageController.navigate(destination, { category });
  }

  onPageLeave() {
    this._layout?.resetScroll();
  }
}

customElements.define(CocktailPage.is, CocktailPage);
