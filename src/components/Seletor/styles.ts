import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

export const SeletorSection = styled.section`
  background-color: ${colors.branco};
  padding: 16px;
  width: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 16px;

  .title-mes {
    text-align: center;
    font-size: 24px;

    p {
      color: ${colors.gray};
      padding: 8px;
      font-size: 16px;
    }
  }

  .container-title {
    display: flex;
    justify-content: space-between;
  }

  .input-mes {
    label {
      color: ${colors.gray};
      padding-bottom: 8px;

      
    @media (max-width: ${breakpoints.tablet}) {
      display: block;
    }
    }

    select {
      background-color: ${colors.branco};
      border: 1px solid ${colors.lightGray};
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 14px;

      &:focus {
        outline: 2px solid ${colors.roxo};
      }
    }

    @media (max-width: ${breakpoints.tablet}) {
      text-align: center;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    gap: 8px;
  }

`;
