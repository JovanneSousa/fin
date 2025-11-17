import styled from "styled-components";
import { colors } from "../../globalStyles";

export const PillStyled = styled.button`
  background-color: ${colors.branco};
  color: ${colors.darkGray};
  border: 3px solid ${colors.lightGray};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  height: 40px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.verde};
    color: ${colors.lightGray};
    border-color: ${colors.verde};
  }
`;
