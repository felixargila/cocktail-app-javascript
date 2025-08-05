import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { PageMixin } from '@open-cells/page-mixin';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import styles from './category-page.css.js';

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
      <h1>Category Page</h1>
      <p>Category: ${this._currentCategory}</p>
    `;
  }

  onPageLeave() {
    this._layout?.resetScroll();
  }
}

customElements.define(CategoryPage.is, CategoryPage);
