import styled from "styled-components";
import { hexToRgb } from "../../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../../styles/cores";
import { breakpoints } from "../../styles/utilStyles";

interface TableProps {
  rowHeight: string;
  isMobile: boolean;
  tableHeight: string;
}

export const TableWrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
`;

export const StyledTable = styled.table.withConfig({
  shouldForwardProp: (props) =>
    !["rowHeight", "isMobile", "tableHeight"].includes(props),
})<TableProps>`
  background-color: ${({ theme }) => theme.defaultBackgroundColor};
  font-size: 14px;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  color: ${({ theme }) => theme.gray};

  .button-container {
    display: flex;
    gap: 10px;
    justify-content: center;

    &.categorias {
      justify-content: start;
    }
  }

  tbody tr td {
    border-bottom: 2px solid ${({ theme }) => theme.lightGray};
  }

  tbody {
    display: block;
    overflow: hidden;
    height: ${({ tableHeight }) => tableHeight};
    transition: height 250ms ease;
  }

  .icone {
    width: 50px;
    text-align: center;
  }

  tr {
    height: ${({ rowHeight }) => `${rowHeight}px`};
    transition: background-color ease 0.3s;
  }

  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  thead th {
    background-color: ${({ theme }) => theme.lighterGray};
  }

  .data-wrapper {
    background-color: ${({ theme }) => theme.shiningGray};
    font-size: 12px;
    height: 16px;

    td {
      height: 16px;
      border: none;
    }
  }

  th,
  td {
    height: 56px;
    padding: ${({ isMobile }) => (isMobile ? "4px 8px" : "0 18px")};
    text-align: left;
  }

  td {
    p {
      display: flex;
      align-items: center;
    }
  }

  .despesa {
    color: ${colors.vermelho};
  }

  .receita {
    color: ${colors.verde};
  }

  .cat {
    font-size: 12px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    tr {
      &:hover {
        background-color: ${({ theme }) => theme.shiningGray};
      }
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    thead {
      background-color: ${({ theme }) => theme.lightGray};

      tr,
      th {
        background-color: ${({ theme }) => theme.lightGray};
      }
    }

    tr td,
    tr {
      border: none;
    }
  }
`;

export const CloseBox = styled.div`
  width: 30px;
  height: 30px;
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
  width: 30px;
  height: 30px;
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

const PerifericosTabela = styled.div`
  background-color: ${({ theme }) => theme.defaultBackgroundColor};
  width: 100%;
  padding: 16px;

  button {
    margin: 0;

    &.transacao {
      height: 44px;
      width: 44px;
      border-radius: 50%;
    }
  }

  .input-wrapper {
    margin: 0;
    justify-content: center;
  }
`;

export const RodapeTabela = styled(PerifericosTabela)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  gap: 16px;

  .pag-wrapper {
    display: flex;
    gap: 16px;
    align-items: center;

    .input-wrapper {
      flex-direction: row;
      align-items: center;
      gap: 16px;

      label {
        white-space: nowrap;
      }
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;

    .input-wrapper {
      margin: 0;
    }
  }
`;

interface Props {
  isSearching: boolean;
  page: "categorias" | "transacoes";
  isMobile: boolean;
}

export const StyledTopoTabela = styled(PerifericosTabela).withConfig({
  shouldForwardProp: (prop) => !["isSearching", "isMobile"].includes(prop),
})<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({ page }) => (page == "transacoes" ? "column" : "row")};
  padding: ${({ page }) =>
    page == "categorias" ? "24px" : "16px 16px 0 16px"};

  .filter-section {
    display: flex;
    justify-content: space-between;
  }

  div.tipo {
    display: flex;
    width: 100%;
    justify-content: ${({ isMobile, isSearching }) =>
      isMobile && isSearching ? "flex-end" : "space-between"};
  }

  .seletor {
    max-width: 200px;

    opacity: ${({ isMobile, isSearching }) =>
      !isMobile || (isMobile && !isSearching) ? "1" : "0"};

    pointer-events: ${({ isMobile, isSearching }) =>
      !isMobile || (isMobile && !isSearching) ? "auto" : "none"};

    transition:
      opacity 0.2s ease,
      max-width 0.3s ease;

    &.hidden {
      max-width: 0;
      opacity: 0;
      pointer-events: none;
    }
  }

  .input-wrapper {
    position: relative;
    input {
      padding-right: 32px;
      transition: width ease 0.3s;
      width: ${({ isSearching }) => (isSearching ? "420px" : "32px")};
      max-width: ${({ isMobile }) => (isMobile ? "80vw" : "auto")};
    }
    select {
      option {
        color: ${colors.preto};
      }
      &.receita {
        background-color: ${colors.verde};
        color: ${colors.branco};
        option {
          background-color: ${colors.verdeClaro};
        }
      }
      &.despesa {
        background-color: ${colors.vermelho};
        color: ${colors.branco};
        option {
          background-color: ${colors.vermelhoClaro};
        }
      }
    }
  }
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  position: absolute;
  right: 12px;
  top: 30%;

  &:hover {
    color: ${colors.verde};
  }
`;

interface StyledArrowFilterProps {
  isActive: boolean;
}

export const StyledArrowFilter = styled(FontAwesomeIcon).withConfig({
  shouldForwardProp: (props) => !["isActive"].includes(props),
})<StyledArrowFilterProps>`
  opacity: ${({ isActive }) => Number(isActive)};
  cursor: pointer;
  transition:
    opacity ease 0.3s,
    transform ease 0.5s;

  &:hover {
    opacity: 1;
  }

  &.rotate {
    transform: rotate(-180deg);
  }
`;
