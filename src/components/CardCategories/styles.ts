import styled from "styled-components";
import { colors } from "../../styles/cores";
import { breakpoints } from "../../styles/utilStyles";

export const CardStyled = styled.div`
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: ${colors.shadow};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;

  .content {
    width: 100%;
  }

  &.receita {
    background-color: color-mix(in srgb, ${colors.verde} 20%, ${({ theme }) => theme.defaultBackgroundColor});
    border: 1px solid ${colors.verde};
  }
  &.despesa {
    background-color: color-mix(in srgb, ${colors.vermelho} 20%, ${({ theme }) => theme.defaultBackgroundColor});
    border: 1px solid ${colors.vermelho};
  }
  &.saldo {
    background-color: color-mix(in srgb, ${colors.azul} 20%, ${({ theme }) => theme.defaultBackgroundColor});
    border: 1px solid ${colors.azul};
  }

  .valor {
    font-size: 22px;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};
    margin: 8px 0;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.gray};
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 8px 16px;

    .valor {
      font-size: 16px;
    }
  }
`;
