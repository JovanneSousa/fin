import styled from "styled-components";
import { colors } from "../../globalStyles";
import type { ButtonProps } from ".";

export const ButtonStyled = styled.button<ButtonProps>`
  padding: 8px 16px;
  width: 100%;
  border: none;
  outline: none;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ bgColor }) =>
    bgColor === colors.lightGray ? colors.gray : colors.branco};
  padding: ${({ padding }) =>
    padding === "big" ? "16px 32px" : padding === "medium" ? "" : "8px 12px"};
  border-radius: ${({ padding }) =>
    padding === "big" ? "32px" : padding === "medium" ? "16px" : "8px"};
  margin-top: 8px;
  font-size: 16px;
  transition: all 0.4s ease;
  cursor: pointer;

  &:hover {
    background-color: ${colors.darkGray};
    color: ${colors.branco};
  }
`;
