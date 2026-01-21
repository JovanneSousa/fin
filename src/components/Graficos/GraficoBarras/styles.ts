  import styled from "styled-components";
  import { breakpoints, colors } from "../../../globalStyles";

  export const BarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    grid-area: a;

    @media (max-width: ${breakpoints.tablet}) {
      height: 350px;
    }

    .infos-container,
    .legenda-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .infos-container {
      gap: 16px;
      padding: 16px 24px;
      border-radius: 16px;
      background-color: ${colors.defaultBackgroundColor};
    }

    .legenda-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  `;

  export const LegendItemStyled = styled.div`
    padding-bottom: 16px;
    width: 100%;
    display: flex;
    justify-content: space-between;

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
    span {
      min-height: 20px;min-width: 80px;
    }
  `;
