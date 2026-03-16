import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { colors } from "../../styles/cores";

export const StyledIconAwesome = styled(FontAwesomeIcon)`
  background-color: red;
`;

interface BackgroundIconProps {
  background?: string;
}

export const BackgroundIcon = styled.span.withConfig({
  shouldForwardProp: (props) => !["background"].includes(props),
})<BackgroundIconProps>`
  background-color: ${({ background, theme }) => background ?? theme.lightGray};
  color: ${({ background, theme }) =>
    background ? colors.branco : theme.gray};
  padding: 8px;
  border-radius: 50%;
  margin: 0;
  cursor: pointer;
  transition:
    background-color ease 0.3s,
    color ease 0.3s;

  &.is-active {
    background-color: ${({ theme }) => theme.gray};
    color: ${({ theme }) => theme.defaultBackgroundColor};
  }
`;
