import styled from "styled-components";
import { colors } from "../../globalStyles";

interface CorProps {
  cor: string;
}

export const ContainerStyledCor = styled.div.withConfig({
  shouldForwardProp: (props) => !["cor"].includes(props),
})<CorProps>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: ${({ cor }) => cor};
  cursor: pointer;
  color: ${colors.branco};
  display: flex;
  align-items: center;
  border: 2px solid ${({ cor }) => cor};
  justify-content: center;

  &:hover {
    border: 2px solid ${colors.preto};
  }
`;
