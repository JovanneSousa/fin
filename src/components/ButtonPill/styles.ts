import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

export const PillStyled = styled.button`
  background-color: ${colors.branco};
  color: ${colors.darkGray};
  border: 1px solid ${colors.lightGray};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    @media (max-width: ${breakpoints.tablet}) {
      background-color: ${colors.verde};
      color: ${colors.lighterGray};
      border-color: ${colors.verde};
    }
  }

  &.is-active {
    background-color: ${colors.verde};
    color: ${colors.lighterGray};
  }
`;
