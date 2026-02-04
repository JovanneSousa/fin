import styled, { css } from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

interface TitleProps {
  graph: "line" | "bar" | "rosca";
}

export const Title = styled.div.withConfig({
  shouldForwardProp: (prop) => !["graph"].includes(prop),
})<TitleProps>`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  color: ${colors.branco};
  font-size: 24px;
  font-weight: bold;
  align-self: flex-start;
  gap: 16px;

  button {
    margin: 0;
  }

  .title-mes {
    font-size: 16px;
  }

  ${({ graph }) =>
    graph != "bar" &&
    css`
      justify-content: space-between;
    `}

  @media (max-width: ${breakpoints.tablet}) {
    padding: 8px 0;
  }
`;
