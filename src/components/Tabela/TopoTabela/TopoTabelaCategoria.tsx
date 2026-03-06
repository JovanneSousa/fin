import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../globalStyles";
import Button from "../../Button";
import { StyledIcon, StyledTopoTabela } from "../styles";
import { useFormNew } from "../../../contexts/FormNew/useFormNew";
import type { TopoTabelaCategoriaProps } from ".";

const TopoTabelaCategoria = ({
  props: {
    fechaBusca,
    isMobile,
    isSearching,
    abreBusca,

    filter,
    setFilter,
    busca,
    setBusca,
  },
  tipo,
}: TopoTabelaCategoriaProps) => {
  const { abreModal } = useFormNew();

  return (
    <StyledTopoTabela
      isMobile
      onClick={fechaBusca}
      page={tipo}
      isSearching={isSearching}
    >
      <div
        className={`button-container seletor ${!isMobile || (isMobile && !isSearching) ? "" : "hidden"}`}
      >
        <Button
          bgColor={filter == "despesa" ? colors.vermelho : colors.lightGray}
          padding="small"
          type="button"
          onClick={() => setFilter("despesa")}
        >
          Despesa
        </Button>
        <Button
          bgColor={filter == "receita" ? colors.verde : colors.lightGray}
          padding="small"
          type="button"
          onClick={() => setFilter("receita")}
        >
          Receita
        </Button>
      </div>
      <form>
        <div className="button-container">
          {!isMobile && (
            <Button
              bgColor={colors.lightGray}
              padding="small"
              type="button"
              icon="plus"
              onClick={() => abreModal("categoria")}
            >
              Nova Categoria
            </Button>
          )}
          <div className="input-wrapper" onClick={(e) => e.stopPropagation()}>
            <input
              className="search"
              id="busca"
              type="text"
              placeholder="Pesquise pelo nome da categoria"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <label htmlFor="busca">
              <StyledIcon onClick={abreBusca} icon={faMagnifyingGlass} />
            </label>
          </div>
        </div>
      </form>
    </StyledTopoTabela>
  );
};

export default TopoTabelaCategoria;
