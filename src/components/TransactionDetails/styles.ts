import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

export const ContainerDetails = styled.div`
  background-color: ${colors.defaultBackgroundColor};
  padding: 16px;
  border-radius: 8px;
  width: 350px;

  p {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }

  form {
    padding-top: 16px;

    &.is-editing {
      input {
        background-color: ${colors.lighterGray};
        border: 1px solid ${colors.lightGray};
      }
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }

  .button-container {
    display: flex;
    gap: 10px;
  }
`;
