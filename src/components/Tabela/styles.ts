import styled from "styled-components";
import { hexToRgb } from "../../Utils";
import { colors } from "../../globalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TableProps {
  rowHeight: string;
  isMobile: boolean;
  tableHeight: string;
}

export const StyledTable = styled.table.withConfig({
  shouldForwardProp: (props) =>
    !["rowHeight", "isMobile", "tableHeight"].includes(props),
})<TableProps>`
  background-color: ${colors.defaultBackgroundColor};
  font-size: 14px;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  color: ${colors.gray};

  .button-container {
    display: flex;
    gap: 10px;
    justify-content: center;

    &.categorias {
      justify-content: start;
    }
  }

  tbody tr td {
    border-bottom: 2px solid ${colors.lightGray};
  }

  tbody {
    display: block;
    overflow: hidden;
    height: ${({ tableHeight }) => tableHeight};
    transition: height 250ms ease;
  }

  .icone {
    width: 50px;
  }

  tr {
    height: ${({ rowHeight }) => `${rowHeight}px`};
  }

  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  thead th {
    background-color: ${colors.lighterGray};
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
  background-color: ${colors.defaultBackgroundColor};
  width: 100%;
  padding: 16px;

  button {
    margin: 0;
  }

  .input-wrapper {
    margin: 0;
  }
`;

export const RodapeTabela = styled(PerifericosTabela)`
  border-radius: 0 0 16px 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  gap: 16px;

  .input-wrapper {
    flex-direction: row;
    align-items: center;
    gap: 16px;

    label {
      white-space: nowrap;
    }
  }
`;

interface Props {
  isSearching: boolean;
  page: "categorias" | "transacoes";
}

export const StyledTopoTabela = styled(PerifericosTabela).withConfig({
  shouldForwardProp: (prop) => !["isSearching"].includes(prop),
})<Props>`
  border-radius: 16px 16px 0 0;
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

  form.tipo {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .input-wrapper {
    position: relative;

    input {
      padding-right: 32px;
      transition: width ease 0.3s;
      width: ${({ isSearching }) => (isSearching ? "420px" : "32px")};
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
