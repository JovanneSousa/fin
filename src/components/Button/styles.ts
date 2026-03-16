import styled from "styled-components";
import type { ButtonProps } from ".";
import { colors } from "../../styles/cores";
import { breakpoints } from "../../styles/utilStyles";

export const ButtonStyled = styled.button.withConfig({
  shouldForwardProp: (prop) => !["bgColor", "padding"].includes(prop),
})<ButtonProps>`
  padding: 8px 16px;
  width: 100%;
  border: none;
  outline: none;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ bgColor, theme }) =>
    bgColor === theme.lightGray
      ? theme.gray
      : bgColor === colors.transparent
        ? theme.gray
        : colors.branco};
  padding: ${({ padding }) =>
    padding === "big" ? "16px 32px" : padding === "medium" ? "" : "8px 12px"};
  border-radius: ${({ padding }) =>
    padding === "big" ? "32px" : padding === "medium" ? "16px" : "8px"};
  margin-top: 8px;
  font-size: 16px;
  transition: all 0.4s ease;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    @media (min-width: ${breakpoints.tablet}) {
      background-color: ${({ bgColor, theme }) =>
        bgColor == theme.defaultBackgroundColor
          ? theme.lightGray
          : theme.darkGray};
      color: ${({ theme }) => theme.defaultBackgroundColor};
    }
  }

  &.prev,
  &.next,
  &.icon {
    margin: 0;
    max-width: 44px;
    max-height: 44px;
    background-color: inherit;
    color: ${colors.verde};
    border-radius: 45%;

    &:hover {
      background-color: ${({ theme }) => theme.lighterGray};
    }
  }

  &:disabled {
    opacity: 0.5;
    &:hover {
      background-color: inherit;
    }
  }
`;
