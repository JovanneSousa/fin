import { LineChart } from "recharts";
import styled from "styled-components";
import { colors } from "../../../globalStyles";

export const GraficoLinhaContainer = styled.section`
  grid-area: c;

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
    flex-direction: column;
  }

  .legenda-container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .legenda-item {
      padding-bottom: 16px;

      &:last-child {
        padding-top: 16px;
        border-top: 1px solid ${colors.lightGray};
      }

      .receita {
        color: ${colors.verde};
      }

      .despesa {
        color: ${colors.vermelho};
      }
    }
  }

  .container-pill button {
    &.is-active {
      background-color: inherit;
      color: ${colors.verde};
      font-weight: bold;
    }
  }
`;

export const StyledLineChart = styled(LineChart)`
  background-color: ${colors.branco};
`;
