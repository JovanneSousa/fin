import styled from "styled-components";
import { hexToRgb } from "../Utils";
import { colors } from "./cores";

export const IconBox = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  background-color: ${({ color }) => `rgba(${hexToRgb(color)}, 0.2)`};
  color: ${({ color }) => color || colors.verde};
`;

export const breakpoints = {
  desktop: "1024px",
  tablet: "768px",
  containerMaxWidth: "1472px",
};
