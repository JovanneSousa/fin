import styled from "styled-components";
import { colors } from "../../globalStyles";

export const ContainerFeedback = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 12px;
  margin: 0 auto;

  button {
    align-self: flex-end;
    margin-bottom: auto;
    width: auto;
  }

  span {
    padding: 16px;
    font-size: 16px;
    text-align: center;
  }
  .success {
    color: ${colors.verde};
  }
  .error {
    color: ${colors.vermelho};
  }
  .info {
    color: ${colors.azul};
  }
`;

export const ProgressBar = styled.div<{
  progress: number;
  type: "success" | "error";
}>`
  width: 100%;
  height: 6px;
  border-radius: 4px;
  background-color: ${colors.defaultBackgroundColor};
  margin-top: 30px;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ progress }) => progress}%;
    background-color: ${({ type }) =>
      type === "success" ? colors.verde : colors.vermelho};
    transition: width 50ms linear;
  }
`;
