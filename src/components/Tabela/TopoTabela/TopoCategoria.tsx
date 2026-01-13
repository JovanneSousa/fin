import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import type { TopoTabelaBaseProps } from ".";
import { colors } from "../../../globalStyles";
import Button from "../../Button";
import { StyledIcon, StyledTopoTabela } from "../styles";

interface TopoCategoriaProps extends TopoTabelaBaseProps {
  isSearching: boolean;
  tipoFiltro: "receita" | "despesa";
  fechaBusca: () => void;
  abreBusca: () => void;
  setFilter: (tipo: "receita" | "despesa") => void;
  abreModal: (tipo: "categoria" | "transacoes") => void;
}

const TopoCategoria = ({
  abreBusca,
  fechaBusca,
  isSearching,
  tipoFiltro,
  type,
  setFilter,
  abreModal,
}: TopoCategoriaProps) => {
  const buttonCategorias = (
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

  return (
    <StyledTopoTabela
      onClick={fechaBusca}
      page={type}
      isSearching={isSearching}
    >
      <div className="button-container">
        <Button
          bgColor={tipoFiltro == "despesa" ? colors.vermelho : colors.lightGray}
          padding="small"
          type="button"
          onClick={() => setFilter("despesa")}
        >
          Despesa
        </Button>
        <Button
          bgColor={tipoFiltro == "receita" ? colors.verde : colors.lightGray}
          padding="small"
          type="button"
          onClick={() => setFilter("receita")}
        >
          Receita
        </Button>
      </div>
      {buttonCategorias}
      <form>
        <div className="input-wrapper" onClick={(e) => e.stopPropagation()}>
          <input
            className="search"
            id="busca"
            type="text"
            placeholder="Pesquise pelo nome da categoria"
          />
          <label htmlFor="busca">
            <StyledIcon onClick={abreBusca} icon={faMagnifyingGlass} />
          </label>
        </div>
      </form>
    </StyledTopoTabela>
  );
};
export default TopoCategoria;
