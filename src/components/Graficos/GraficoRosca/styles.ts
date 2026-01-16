import styled from "styled-components";
import { colors } from "../../../globalStyles";

interface ContainerCorProps {
  bg: string;
}

export const GraficoRoscaContainer = styled.section`
  grid-area: b;

  .infos-container,
  .legenda-container,
  .legenda-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .infos-container {
    gap: 16px;
    padding: 16px 24px;
    border-radius: 16px;
    background-color: ${colors.branco};
  }

  .legenda-container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .legenda-item {
      padding-bottom: 8px;

      p {
        gap: 8px;
        display: flex;
      }

      .receita {
        color: ${colors.verde};
      }

      .despesa {
        color: ${colors.vermelho};
      }
    }
  }
`;

export const ContainerCor = styled.span.withConfig({
  shouldForwardProp: (prop) => !["bg"].includes(prop),
})<ContainerCorProps>`
  margin: 0 auto;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ bg }) => bg};
`;
