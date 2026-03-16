import styled, { css } from "styled-components";
import { colors } from "../../styles/cores";
import { breakpoints } from "../../styles/utilStyles";

interface PillProps {
  radius: boolean;
}

export const PillStyled = styled.button.withConfig({
  shouldForwardProp: (prop) => !["radius"].includes(prop),
})<PillProps>`
  background-color: ${({ theme }) => theme.defaultBackgroundColor};
  color: ${({ theme }) => theme.darkGray};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.defaultBackgroundColor};

  &:hover,
  &.is-active {
    color: ${colors.verde};
    border-color: ${colors.verde};
    border-bottom: 2px solid ${colors.verde};
  }

  &.is-active {
    background-color: ${colors.verde};
    color: ${({ theme }) => theme.lighterGray};
  }

  ${({ radius }: PillProps) =>
    radius &&
    css`
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.lightGray};
      &:hover {
        @media (max-width: ${breakpoints.tablet}) {
          background-color: ${colors.verde};
          color: ${({ theme }) => theme.lighterGray};
          border-color: ${colors.verde};
        }
      }

      &.is-active {
        background-color: ${colors.verde};
        color: ${({ theme }) => theme.lighterGray};
      }
    `}

  &.months {
    border: 2px solid ${colors.verde};
    color: ${colors.verde};
    &:hover {
      background-color: ${colors.verde};
      color: ${({ theme }) => theme.defaultBackgroundColor};
    }
  }
`;
