import styled, { css } from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

interface PillProps {
  radius: boolean;
}

export const PillStyled = styled.button.withConfig({
  shouldForwardProp: (prop) => !["radius"].includes(prop),
})<PillProps>`
  background-color: ${colors.branco};
  color: ${colors.darkGray};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  border-bottom: 2px solid ${colors.branco};

  &:hover,
  &.is-active {
    /* background-color: ${colors.verde}; */
    color: ${colors.verde};
    border-color: ${colors.verde};
    border-bottom: 2px solid ${colors.verde};
  }

  &.is-active {
    background-color: ${colors.verde};
    color: ${colors.lighterGray};
  }

  ${({ radius }: PillProps) =>
    radius &&
    css`
      border-radius: 10px;
      border: 1px solid ${colors.lightGray};
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
    `}

  &.months {
    border: 2px solid ${colors.verde};
    color: ${colors.verde};
    &:hover {
      background-color: ${colors.verde};
      color: ${colors.branco};
    }
  }
`;
