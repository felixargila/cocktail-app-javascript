/* HOME PAGE */
import { css } from 'lit';

export default css`
  h2 {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 300;
  }

  .home-header {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 3rem;

    h2 {
      flex: 1;
    }
  }

  .banner {
    position: relative;
    width: 100%;
    min-height: 10rem;
    margin-top: 3rem;
    padding: 1.5rem;
    box-sizing: border-box;
    background-color: var(--surface-container);
    border-radius: var(--border-radius-container);
    border-bottom-left-radius: 2rem;
  }

  .img-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-img);
    flex-shrink: 0;
  }

  .img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .banner-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem 0 0;
  }

  .heading-h3, h3 {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 300;
    text-transform: uppercase;
  }

  .cocktail-title {
    display: block;
    margin-top: 1.5rem;
    font-size: 2.25rem;
    line-height: 3rem;
  }

  .heading-h3, h3 {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 300;
    text-transform: uppercase;
  }

  .cocktails-categories {
    position: relative;
    min-height: 10rem;
    margin-top: 3rem;
  }

  .categories-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 2rem;
    justify-content: space-between;
    margin-top: 1.5rem;
    background: none;
  }

  .category-item {
    border-radius: .5rem;
    background: var(--surface-container);
  }

  .category-image {
    width: 3.5rem;
    height: auto;
  }

  @media (min-width: 48rem) {
    h2 {
      font-size: 2.5rem;
      line-height: 4rem;
    }
    .home-header {
      flex-direction: row;
      align-items: baseline;
      justify-content: space-between;
    }
    .banner {
      display: flex;
      gap: 2rem;
      border-bottom-left-radius: var(--border-radius-container);
    }
    .img-container {
      width: 20rem;
      height: 19rem;
    }
    .banner-text {
      padding: 1.5rem 0;
    }
    .categories-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 64rem) {
    h2 {
      font-size: 3rem;
    }
    .home-header {
      h2 {
        flex: 0 1 68%;
      }
    }
    .img-container {
      width: 26rem;
    }
    .categories-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 90rem) {
    .home-header {
      h2 {
        flex: 0 1 55%;
      }
    }
    .img-container {
        width: 33.25rem;
    }
    .categories-list {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;