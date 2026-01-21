import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 15px;
  }

  .modal {
    background-color: ${colors.defaultBackgroundColor};
    border-radius: 16px;
    @media (max-width: ${breakpoints.tablet}) {
      width: 100%;
    }
  }
`;
