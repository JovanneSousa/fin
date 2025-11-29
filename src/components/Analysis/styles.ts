import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

type AnalysisProp = {
  isComparison?: boolean;
};

export const Analysis = styled.div<AnalysisProp>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  nav {
    border-radius: 8px;
    padding: 4px;
    background-color: ${colors.lightGray};

    ul {
      display: flex;
      justify-content: space-between;

      li {
        padding: 4px 8px;
        width: 100%;
        border-radius: 8px;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        line-height: 24px;
        transition: all 0.3s ease;

        @media (max-width: ${breakpoints.tablet}) {
          font-size: 12px;
        }
      }

      .is-active {
        background-color: ${colors.branco};
        box-shadow: ${colors.shadow};
      }
    }
  }
  .container-analysis {
    display: grid;
    grid-template-columns: ${({ isComparison }) =>
      isComparison ? "1fr" : "0.7fr 0.3fr"};
    gap: 20px;

    @media (max-width: ${breakpoints.tablet}) {
      grid-template-columns: 1fr;
    }
  }

  .conteudo {
    background-color: ${colors.branco};
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .title-container {
    display: flex;
    justify-content: space-around;
    align-items: center;

    p {
      font-size: 24px;
      font-weight: bold;
      color: ${colors.darkGray};
    }

    @media (max-width: ${breakpoints.tablet}) {
      flex-direction: column;
      gap: 8px;
    }
  }

  .button-container {
    display: flex;
    gap: 8px;

    button {
      max-width: 100px;
      margin: 0;
    }

    &.is-active {
    }
  }

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 20px;
      font-weight: bold;
    }

    button {
      max-width: 80px;
      @media (min-width: ${breakpoints.tablet}) {
        display: none;
      }
    }
  }

  .padding {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 24px;
    height: 100%;
    justify-content: space-around;

    @media (max-width: ${breakpoints.tablet}) {
      padding: 16px;
    }
  }
`;
