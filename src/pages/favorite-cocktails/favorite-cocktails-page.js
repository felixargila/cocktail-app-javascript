import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { PageMixin } from '@open-cells/page-mixin';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import styles from './favorite-cocktails-page.css.js';

export class FavoriteCocktailsPage extends PageTransitionsMixin(PageMixin(LitElement)) {
  static get is() {
    return 'favorite-cocktails-page';
  }

  constructor() {
    super();
    this.pageController = new PageController(this);
    this._layout = null;
  }

  static get styles() {
    return [styles];
  }

  firstUpdated(props) {
    super.firstUpdated?.(props);

    this._layout = this.querySelector('page-layout');
  }

  render() {
    return html`
      <h1>Favorite Cocktails Page</h1>
    `;
  }

  onPageLeave() {
    this._layout?.resetScroll();
  }
}

customElements.define(FavoriteCocktailsPage.is, FavoriteCocktailsPage);
