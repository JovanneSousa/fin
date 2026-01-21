import styled from "styled-components";
import { colors } from "../../globalStyles";

export const HeaderSection = styled.header`
  background-color: ${colors.defaultBackgroundColor};
  padding: 8px;
  position: sticky;
  top: 0;
  left: 0;
  box-shadow: ${colors.shadow};
  z-index: 1;
  transition: transform 0.3s ease;

  p.title {
    font-size: 22px;
    font-weight: bold;
  }

  &.hide {
    transform: translateY(-100%);
  }

  &.show {
    transform: translateY(0);
  }

  p {
    font-size: 14px;
    span {
      font-size: 18px;
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
