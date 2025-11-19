import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

export const Analysis = styled.div`
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
    grid-template-columns: .7fr .3fr;
    gap: 20px;

    @media (max-width: ${breakpoints.tablet}) {
        grid-template-columns: 1fr;
    }

  }
`;
