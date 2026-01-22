import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { colors } from "../../globalStyles";

export const StyledIconAwesome = styled(FontAwesomeIcon)`
  background-color: red;
`;

interface BackgroundIconProps {
  background?: string;
}

export const BackgroundIcon = styled.span.withConfig({
  shouldForwardProp: (props) => !["background"].includes(props),
})<BackgroundIconProps>`
  background-color: ${({ background }) => background ?? colors.lightGray};
  color: ${({ background }) => (background ? colors.branco : colors.gray)};
  padding: 8px;
  border-radius: 50%;
  margin: 0;
  cursor: pointer;
  transition:
    background-color ease 0.3s,
    color ease 0.3s;

  &.is-active {
    background-color: ${colors.gray};
    color: ${colors.defaultBackgroundColor};
  }
`;
