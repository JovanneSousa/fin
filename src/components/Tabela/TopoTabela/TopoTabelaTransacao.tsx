import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button";
import Seletor from "../../Seletor";
import { StyledIcon, StyledTopoTabela } from "../styles";
import { useFormNew } from "../../../contexts/FormNew/useFormNew";
import type { TopoTabelaTransacaoProps } from ".";
import { useTheme } from "styled-components";
import { colors } from "../../../styles/cores";

const TopoTabelaTransacao = ({
  props: {
    changeType,
    fechaBusca,
    isMobile,
    isSearching,
    tipoFiltro,
    abreBusca,

    busca,
    setIsFilterActive,
    setBusca,
  },
  tipo,
}: TopoTabelaTransacaoProps) => {
  const { abreModal } = useFormNew();
  const theme = useTheme();

  const button = {
    receita: (
      <Button
        bgColor={colors.verde}
        padding="small"
        type="button"
        icon="plus"
        onClick={() => abreModal("receita")}
      >
        Nova Receita
      </Button>
    ),
    despesa: (
      <Button
        bgColor={colors.vermelho}
        padding="small"
        type="button"
        icon="plus"
        onClick={() => abreModal("despesa")}
      >
        Nova Despesa
      </Button>
    ),
  };

  return (
    <StyledTopoTabela
      isMobile={isMobile}
      isSearching={isSearching}
      onClick={fechaBusca}
      page={tipo}
    >
      <div className="tipo">
        <div
          className={`input-wrapper seletor ${!isMobile || (isMobile && !isSearching) ? "" : "hidden"}`}
        >
          <select
            className={tipoFiltro}
            onChange={(e) =>
              changeType(e.target.value as "todos" | "despesa" | "receita")
            }
            id="tipo"
          >
            <option value="todos">Todos</option>
            <option value="despesa">Despesas</option>
            <option value="receita">Receitas</option>
          </select>
        </div>
        <div className="button-container">
          {tipoFiltro !== "todos" && !isMobile && button[tipoFiltro]}
          <div
            className={`input-wrapper seletor ${!(isMobile && isSearching) ? "" : "hidden"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className="transacao"
              onClick={() => setIsFilterActive(true)}
              bgColor={theme.lightGray}
              icon="filter"
            />
          </div>
          <div
            className="input-wrapper"
            onClick={(e) => {
              e.stopPropagation();
              abreBusca();
            }}
          >
            <input
              className="search"
              id="busca"
              type="text"
              placeholder="Pesquise por descrição, categoria ou valor"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <label htmlFor="busca">
              <StyledIcon icon={faMagnifyingGlass} />
            </label>
          </div>
        </div>
      </div>
      <Seletor page={tipo} />
    </StyledTopoTabela>
  );
};

export default TopoTabelaTransacao;
