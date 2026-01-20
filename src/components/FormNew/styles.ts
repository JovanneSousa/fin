import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

export const NewSection = styled.section`
  background-color: ${colors.branco};
  border-radius: 8px;
  transition: height ease 0.3s;
  width: 450px;

  .cores {
    padding: 16px 0;
    width: 100%;
    display: flex;
    gap: 8px;
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

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;

    p {
      font-size: 20px;
      font-weight: bold;
    }

    button {
      max-width: 44px;
      margin: 0;
      color: ${colors.preto};
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
`