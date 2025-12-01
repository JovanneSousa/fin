import styled from "styled-components";
import { colors } from "../../globalStyles";

export const HeaderSection = styled.header`
  background-color: ${colors.branco};
  padding: 8px;
  position: sticky;
  top: 0;
  left: 0;
  box-shadow: ${colors.shadow};
  z-index: 1;

  p {
    span {
      font-size: 20px;
      background: ${colors.gradient};
      font-weight: bold;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0;
  }

  button {
    margin: 0;
    max-width: 88px;
  }
`;
