import styled, { css } from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

interface SeletorSectionProps {
  positionTitle: "center" | "space-between";
  page: "default" | "transacoes" | "comparativo";
  isSelecting?: boolean;
}

const styles = {
  comparativo: css`
    flex-direction: row;
    padding: 8px 24px;

    .container-title p {
      color: ${colors.darkGray};
    }
  `,
  transacoes: css`
    flex-direction: column;
    padding: 16px 24px;

    .container-pill {
      gap: 8px;
      padding-bottom: 16px;
      border-bottom: 1px solid ${colors.lightGray};
    }
  `,
  default: css`
    flex-direction: column;
    padding: 24px;
    .container-pill {
      padding-bottom: 16px;
      border-bottom: 1px solid ${colors.lightGray};
    }
  `,
};

export const SeletorSection = styled.section.withConfig({
  shouldForwardProp: (prop) =>
    !["positionTitle", "page", "isSelecting"].includes(prop),
})<SeletorSectionProps>`
  width: 100%;
  background-color: ${colors.defaultBackgroundColor};
  border-radius: 16px;
  display: flex;
  flex-direction: ${({ page }) => (page == "comparativo" ? "row" : "column")};
  justify-content: space-between;
  gap: 16px;
  margin-bottom: ${({ page }) => (page == "default" ? "16px" : "0")};
  ${({ page, isSelecting }) =>
    page === "transacoes" &&
    css`
      overflow: hidden;
      max-height: ${isSelecting ? "250px" : "84px"};
      transition: max-height 0.7s ease;
    `}

  ${({ page }) => styles[page]}

  .month-container {
    display: flex;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;

    opacity: ${({ isSelecting }) => (isSelecting ? "1" : "0")};
    transform: ${({ isSelecting }) =>
      isSelecting ? "translateY(0)" : "translateY(-8px)"};

    pointer-events: ${({ isSelecting }) => (isSelecting ? "auto" : "none")};

    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .title-mes {
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    justify-content: ${({ positionTitle }) => positionTitle};
    color: ${colors.verde};

    p {
      cursor: pointer;
      padding: 0 8px;
    }

    @media (max-width: ${breakpoints.tablet}) {
      padding-bottom: 8px;
    }
  }

  .container-title {
    display: flex;
    justify-content: space-between;

    @media (max-width: ${breakpoints.tablet}) {
      display: block;
    }
  }

  .container-pill {
    display: flex;
    font-size: 14px;

    button {
      @media (max-width: ${breakpoints.tablet}) {
        font-size: 14px;
      }
    }
  }

  .input-container {
    display: flex;
    gap: 20px;

    .input-wrapper {
      width: 100%;
    }

    @media (max-width: ${breakpoints.tablet}) {
      display: block;
    }
  }

  .input-mes {
    position: relative;
    display: inline-block;

    label {
      color: ${colors.gray};
      padding-bottom: 8px;

      @media (max-width: ${breakpoints.tablet}) {
        display: block;
      }
    }

    .icon-left {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: ${colors.gray};
    }

    select {
      background-color: ${colors.defaultBackgroundColor};
      border: 1px solid ${colors.lightGray};
      padding: 8px 0;
      padding-left: 32px;
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

    @media (max-width: ${breakpoints.tablet}) {
      text-align: center;
      width: 100%;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    gap: 8px;
  }

  .content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease;

    &.is-active {
      max-height: 500px;
    }
  }
`;
