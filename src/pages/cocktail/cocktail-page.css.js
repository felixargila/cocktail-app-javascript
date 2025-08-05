/* NOT FOUND PAGE */
import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  h2, h3, p {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .heading-h3, h3 {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 300;
    text-transform: uppercase;
  }

  .page-header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .cocktail-ingredients {
    margin-top: 3rem;
  }

  .cocktail-img {
    width: 100%;
    height: 14.5rem;
  }

  .cocktail-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--border-radius-img);
  }

  .ingredients-list {
    margin-top: 1.5rem;
    ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1.5rem;

      li {
        display: flex;
        gap: 2rem;

        p {
          flex: 0 1 50%;
          color: var(--on-surface-variant);
          &:nth-of-type(1) {
            color: var(--on-surface);
          }
        }
      }
    }
    .youtube {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 3rem;
    }

    /* YouTube iframe container responsive */
    .youtube-container {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%; /* Ratio 16:9 */
      height: 0;
      margin-top: 3rem;
      overflow: hidden;
      border-radius: var(--border-radius-img, 8px);
    }

    .youtube-iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
      border-radius: var(--border-radius-img, 8px);
    }

    .youtube-fallback {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 8px;
      padding: 0.5rem;
      z-index: 1;
    }

    .youtube-fallback .youtube {
      margin: 0;
      color: white;
      text-decoration: none;
      font-size: 0.875rem;
    }

    .youtube-fallback .youtube:hover {
      color: #ff6b6b;
    }
  }

  .cocktail-instructions {
    margin-top: 3rem;

    p {
      margin-top: 1rem;
    }
  }

  @media (min-width: 48rem) {
    .cocktail-ingredients {
      display: grid;
      grid-template-columns: repeat(2, 24rem);
      grid-template-rows: repeat(3, max-content);
      grid-gap: 3rem 8rem;
    }
    .cocktail-img {
      grid-area: 1 / 1 / 2 / 2;
      height: 17rem;
    }
    .ingredients-list {
      grid-area: 1 / 2 / 4 / 3;
      margin: 0;

      ul {
        li {
          display: block;
        }
      }
    }
    .cocktail-instructions {
      grid-area: 2 / 1 / 4 / 2;
      margin-top: 0;
    }
  }

  @media (min-width: 64rem) {
    .cocktail-ingredients {
      grid-gap: 3rem;
    }
    .ingredients-list {
      ul {
        li {
          display: flex;
          gap: 2rem;
        }
      }
    }
  }
`;