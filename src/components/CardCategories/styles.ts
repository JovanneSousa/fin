import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

export const CardStyled = styled.div`
  border-radius: 16px;
  padding: 16px 24px;
  box-shadow: ${colors.shadow};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.receita {
    background-color: color-mix(in srgb, ${colors.verde} 20%, white);
    border: 1px solid ${colors.verde};
  }
  &.despesa {
    background-color: color-mix(in srgb, ${colors.vermelho} 20%, white);
    border: 1px solid ${colors.vermelho};
  }
  &.saldo {
    background-color: color-mix(in srgb, ${colors.azul} 20%, white);
    border: 1px solid ${colors.azul};
  }

  .valor {
    font-size: 22px;
    font-weight: 500;
    color: ${colors.preto};
    margin: 8px 0;
  }

  p {
    font-size: 14px;
    color: ${colors.gray};
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 8px 16px;

    .valor {
      font-size: 16px;
    }
  }
`;
