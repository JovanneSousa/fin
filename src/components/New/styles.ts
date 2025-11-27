import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

export const NewSection = styled.section`
  background-color: ${colors.branco};
  border-radius: 16px;

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

  .type {
    margin: 16px 0;
  }

  label {
    font-size: 14px;
  }

  .button-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .padding {
    box-sizing: border-box;
    padding: 24px;
  }

  .content {
    @media (max-width: ${breakpoints.tablet}) {
      display: none;

      &.is-active {
        display: block;
      }
    }
  }
`;
