import type { JSX, SetStateAction } from "react";
import { useFormNew } from "../../contexts/FormNew/useFormNew";
import { colors } from "../../globalStyles";
import Button from "../Button";
import Seletor from "../Seletor";
import { StyledIcon, StyledTopoTabela } from "./styles";
import type { Dispatch } from "@reduxjs/toolkit";

export type TipoFiltroTransacoes = "receita" | "despesa" | "todos";
export type TipoFiltroSemTodos = Exclude<TipoFiltroTransacoes, "todos">;

interface TopoTabelaProps {
  isSearching: boolean;
  fechaBusca: () => void;
  type: "categorias" | "transacoes";
  tipoFiltro: TipoFiltroTransacoes;
}

export const TopoTabela = ({
  fechaBusca,
  isSearching,
  type,
  tipoFiltro,
}: TopoTabelaProps) => {
  const { abreModal } = useFormNew();

  let actionButton: JSX.Element | null = null;

  if (type === "transacoes" && tipoFiltro !== "todos") {
    actionButton =
      tipoFiltro === "receita" ? (
        <Button
          onClick={() => abreModal("receita")}
          padding="small"
          type="button"
          bgColor={colors.lightGray}
          icon="plus"
        >
          Nova Receita
        </Button>
      ) : (
        <Button
          onClick={() => abreModal("despesa")}
          padding="small"
          type="button"
          bgColor={colors.lightGray}
          icon="plus"
        >
          Nova Despesa
        </Button>
      );
  }

  if (type === "categorias") {
    actionButton = (
      <Button
        onClick={() => abreModal("categoria")}
        padding="small"
        type="button"
        bgColor={colors.lightGray}
        icon="plus"
      >
        Nova Categoria
      </Button>
    );
  }

  return (
    <StyledTopoTabela
      isSearching={isSearching}
      onClick={fechaBusca}
      page={type}
    >
      <form className="tipo">
        <div className="input-wrapper">
          <select
            onChange={(e) =>
              setTipo(e.target.value as "todos" | "despesa" | "receita")
            }
            id="tipo"
          >
            <option value="todos">Todos</option>
            <option value="despesa">Despesas</option>
            <option value="receita">Receitas</option>
          </select>
        </div>
        <div className="button-container">
          {actionButton}
          <div className="input-wrapper" onClick={(e) => e.stopPropagation()}>
            <input
              className="search"
              id="busca"
              type="text"
              placeholder="Pesquise por descrição, categoria ou valor"
              value={valorBusca}
              onChange={(e) => setValorBusca(e.target.value)}
            />
            <label htmlFor="busca">
              <StyledIcon onClick={abreBusca} icon={faMagnifyingGlass} />
            </label>
          </div>
        </div>
      </form>
      <Seletor page={type} />
    </StyledTopoTabela>
  );
};
