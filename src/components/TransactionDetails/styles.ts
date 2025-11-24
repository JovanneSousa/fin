import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

export const ContainerDetails = styled.div`
  background-color: ${colors.branco};
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
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }

  .button-container {
    display: flex;
    gap: 10px;
  }
`;
