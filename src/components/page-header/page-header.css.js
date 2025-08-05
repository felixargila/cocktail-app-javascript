import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  h2 {
    margin: 0;
    padding: 0;
    font-weight: 300;
    margin-top: 3rem;
  }

  .page-header-sup {
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .page-header-sup li {
    display: flex;
  }

  .md-outlined-button-text {
    display: none;
  }

  /* 768px */
  @media (min-width: 48rem) {
    h2 {
      font-size: 2.5rem;
      line-height: 4rem;
    }
    .md-outlined-button-text {
      display: inline;
    }
  }

  /* 1024px */
  @media (min-width: 64rem) {
    h2 {
      font-size: 3rem;
    }
  }


`;
