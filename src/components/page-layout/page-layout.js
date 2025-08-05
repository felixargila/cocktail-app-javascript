import { LitElement, html } from 'lit';
import { ElementController } from '@open-cells/element-controller';
import { styles } from './page-layout.css.js';


export class PageLayout extends LitElement {
  static get is() {
    return 'page-layout';
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.elementController = new ElementController(this);
    this._scroller = null;
  }

  firstUpdated(props) {
    super.firstUpdated(props);

    this._scroller = this.shadowRoot?.querySelector('.scroller');

    this._scroller?.addEventListener('scroll', ev => {
      this.elementController.publish('scroll', {
        scrollTop: ev.target?.scrollTop,
      });
    });
  }

  disconnectedCallback() {
    this._scroller?.removeEventListener('scroll', ev => {
      this.elementController.publish('scroll', {
        scrollTop: ev.target?.scrollTop,
      });
    });
    this.elementController.unsubscribe('scroll');
    super.disconnectedCallback();
  }

  render() {
    return html`
      <div class="scroller">
        <div class="content">
          <div class="region">
            <div class="zone">
              <slot></slot>
            </div>
          </div>
        </div>

        <div class="footer">
          <div class="region">
            <div class="zone">${this._footerTpl}</div>
          </div>
        </div>
      </div>
    `;
  }

  get _footerTpl() {
    return html`
      <div class="footer-content">
        <p>
          Data provided by
          <a href="https://www.themealdb.com/api.php" target="_blank">The Cocktail DB</a>
        </p>
        <p>
          Made with ❤️ with
          <a href="https://www.opencells.dev">Open Cells</a>
        </p>
      </div>
    `;
  }

  resetScroll() {
    this._scroller?.scrollTo(0, 0);
  }
}

// Definir el custom element
customElements.define(PageLayout.is, PageLayout);