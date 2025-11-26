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
    padding: 8px;
  }

  a {
    padding: 8px 16px;
    color: ${colors.gray};
    border: 3px solid ${colors.lightGray};
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${colors.verde};
      color: ${colors.lightGray};
      box-shadow: 0 0 12px ${colors.verde};
    }
  }
`;
