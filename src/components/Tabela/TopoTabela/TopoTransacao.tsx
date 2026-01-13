import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import type { TopoTabelaBaseProps } from ".";
import { colors } from "../../../globalStyles";
import Button from "../../Button";
import { StyledIcon, StyledTopoTabela } from "../styles";
import Seletor from "../../Seletor";

interface TopoTransacaoProps extends TopoTabelaBaseProps {
  isSearching: boolean;
  tipoFiltro: "receita" | "despesa" | "todos";
  fechaBusca: () => void;
  abreBusca: () => void;
  setFilter: (tipo: "receita" | "despesa" | "todos") => void;
  abreModal: (tipo: "receita" | "despesa") => void;
}

const TopoTransacao = ({
  abreBusca,
  fechaBusca,
  setFilter,
  abreModal,
  isSearching,
  tipoFiltro,
  type,
}: TopoTransacaoProps) => {
  const button = {
    despesa: (
      <Button
        onClick={() => abreModal("despesa")}
        padding="small"
        type="button"
        bgColor={colors.lightGray}
        icon="plus"
      >
        Nova Despesa
      </Button>
    ),
    receita: (
      <Button
        onClick={() => abreModal("receita")}
        padding="small"
        type="button"
        bgColor={colors.lightGray}
        icon="plus"
      >
        Nova Receita
      </Button>
    ),
  };

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
              setFilter(e.target.value as "todos" | "despesa" | "receita")
            }
            id="tipo"
          >
            <option value="todos">Todos</option>
            <option value="despesa">Despesas</option>
            <option value="receita">Receitas</option>
          </select>
        </div>
        <div className="button-container">
          {tipoFiltro != "todos" && button[tipoFiltro]}
          <div className="input-wrapper" onClick={(e) => e.stopPropagation()}>
            <input
              className="search"
              id="busca"
              type="text"
              placeholder="Pesquise por descrição, categoria ou valor"
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

export default TopoTransacao;
