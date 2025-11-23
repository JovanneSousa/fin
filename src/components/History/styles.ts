import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";
import { hexToRgb } from "../../Utils";

export const HistorySection = styled.section`
  background-color: ${colors.branco};
  width: 100%;
  padding: 24px;
  border-radius: 16px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .title-hist {
    font-weight: bold;
    font-size: 24px;
  }

  .container-transacao {
    border-radius: 16px;
    border: 1px solid ${colors.lightGray};
    padding: 16px;
    display: flex;
    justify-content: space-between;

    &:hover {
      background-color: ${colors.lighterGray};
    }

    .icon-hist,
    .value-hist {
      display: flex;
      align-items: center;
      width: 100%;
      gap: 20px;
      text-align: center;
    }

    .value-hist {
      @media (max-width: ${breakpoints.tablet}) {
        gap: 0;
      }
    }

    .icon-hist {
      @media (max-width: ${breakpoints.tablet}) {
        padding-bottom: 10px;
        border-bottom: 1px solid ${colors.lightGray};
      }
    }

    @media (max-width: ${breakpoints.tablet}) {
      flex-direction: column;
    }
  }

  p.value {
    color: ${colors.verde};
    font-weight: bold;
    font-size: 16px;

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 16px;
    }
  }
  .container-titulo-nome {
    overflow: hidden;
    width: 80%;
  }

  .desc {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  p.data {
    color: ${colors.gray};
    font-weight: 300;
    font-size: 14px;

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 12px;
    }
  }

  p.cat {
    color: ${colors.gray};
    font-weight: 300;
    font-size: 12px;
  }

  .container-value {
    display: flex;
    gap: 20px;

    @media (max-width: ${breakpoints.tablet}) {
      display: block;
    }
  }

  .value-hist {
    justify-content: flex-end;

    @media (max-width: ${breakpoints.tablet}) {
      justify-content: space-around;
    }
  }

  .button-container {
    display: flex;
    gap: 10px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 16px;
  }
`;

export const IconBox = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  background-color: ${({ color }) => `rgba(${hexToRgb(color)}, 0.2)`};
  color: ${({ color }) => color || "#57b846"};
`;

export const CloseBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  color: ${colors.vermelho};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(${hexToRgb(colors.vermelho)}, 0.2);
  }
`;
