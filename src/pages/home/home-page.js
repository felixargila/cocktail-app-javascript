import { html, LitElement } from 'lit';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import { PageMixin } from '@open-cells/page-mixin';
import styles from './home-page.css.js';
import '../../components/page-layout/page-layout.js';

export class HomePage extends PageTransitionsMixin(PageMixin(LitElement)) {
  static get is() {
    return 'home-page';
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

  async firstUpdated(props) {
    super.firstUpdated?.(props);
  }

  render() {
    return html`
      <page-layout>
        <h1>Welcome to OpenCells!</h1>
      </page-layout>
    `;
  }
}

// Definir el custom element
customElements.define(HomePage.is, HomePage);