import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { PageMixin } from '@open-cells/page-mixin';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import styles from './not-found-page.css.js';
import '../../components/page-layout/page-layout.js';
import '../../components/page-header/page-header.js';

export class NotFoundPage extends PageTransitionsMixin(PageMixin(LitElement)) {
  static get is() {
    return 'not-found-page';
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
      <page-layout>
        <page-header
          navigateToHome=""
          headerTitle="Page Not Found"
           @navigate-to="${(ev) => this._navigateTo(ev, ev.detail.destination, ev.detail.params)}"
        ></page-header>
      </page-layout>
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

  onPageLeave() {
    this._layout?.resetScroll();
  }
}

customElements.define(NotFoundPage.is, NotFoundPage);
