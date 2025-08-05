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
  }

  @media (min-width: 90rem) {
    .home-header {
      h2 {
        flex: 0 1 55%;
      }
    }
  }
`;