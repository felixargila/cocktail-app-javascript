/* NOT FOUND PAGE */
import { css } from 'lit';

export default css`
  :host {
    display: block;
  }
  h2, h3, p, ul {
    padding: 0;
    margin: 0;
  }

  ul {
    list-style: none;
  }

  .categories-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 2rem;
    justify-content: space-between;
    margin-top: 1.5rem;
    background: none;

    &.page-categories {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-column-gap: 1rem;
      grid-row-gap: 1rem;
      align-items: stretch;
      margin-top: 3rem;

      a {
        text-decoration: none;
        color: var(--primary);
        &.recipe-title {
          margin-top: 0;
          margin-bottom: auto;
          font-size: 1.5rem;
          line-height: 2rem;
          font-weight: 300;
        }
      }
    }

    .category {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 1rem;
      border-radius: var(--border-radius-container);
      border-bottom-left-radius: 2rem;
      background-color: var(--surface-container);
      /* min-height: 19rem; */

      .img-container {
        width: 100%;
        height: 10rem;
      }
    }
  }

  .img-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 10rem;
    border-radius: var(--border-radius-img);
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .recipe-title {
    margin-top: 0;
    margin-bottom: auto;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 300;
  }

  .categories-description {
    margin-top: 1.5rem;
  }

  /* 1024px */
  @media (min-width: 64rem) {
    .categories-list {
      grid-template-columns: repeat(3, 1fr);
      &.page-categories {
          grid-template-columns: repeat(3, 1fr);
      }
    }
    .img-container {
      width: 26rem;
      /* height: 10rem; */
    }
  }

  /* 1440px */
  @media (min-width: 90rem) {
    .categories-list {
      grid-template-columns: repeat(4, 1fr);
    }
    .img-container {
      width: 33.25rem;
      /* height: 10rem; */
    }
    .categories-description {
      width: 65%;
    }
  }
`;