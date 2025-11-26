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

  button {
    margin: 0;
    max-width: 80px;
  }

  .container-hist-title {
    display: flex;
    justify-content: space-between;

    .title-hist {
      font-weight: bold;
      font-size: 24px;

      @media (max-width: ${breakpoints.tablet}) {
        font-size: 20px;
      }
    }

    select {
      background-color: ${colors.lighterGray};
      border: 1px solid ${colors.lightGray};
      padding: 8px 32px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 0;

      &:focus {
        outline: 2px solid ${colors.verde};
      }

      @media (max-width: ${breakpoints.tablet}) {
        width: 100%;
      }
    }
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
      padding-top: 8px;
    }
  }

  .button-container {
    display: flex;
    gap: 10px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 16px;
  }

  p.despesa {
    color: ${colors.vermelho};
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
  color: ${({ color }) => color || colors.verde};
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

export const DetailBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  color: ${colors.azul};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(${hexToRgb(colors.azul)}, 0.2);
  }
`;
