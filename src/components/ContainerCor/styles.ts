import styled from "styled-components";

interface CorProps {
  cor: string;
}

export const ContainerStyledCor = styled.div.withConfig({
  shouldForwardProp: (props) => !["cor"].includes(props),
})<CorProps>`
  margin: 0 auto;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ cor }) => cor};
  cursor: pointer;
`;
