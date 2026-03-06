import TopoTabelaCategoria from "./TopoTabelaCategoria";
import TopoTabelaTransacao from "./TopoTabelaTransacao";

type BaseProps = {
  isMobile: boolean;
  isSearching: boolean;
  fechaBusca: () => void;
  abreBusca: () => void;
  busca: string;
  setBusca: (value: string) => void;
};

export interface TopoTabelaCategoriaProps {
  tipo: "categorias";
  props: BaseProps & {
    filter: "receita" | "despesa";
    setFilter: (value: "receita" | "despesa") => void;
  };
}

export interface TopoTabelaTransacaoProps {
  tipo: "transacoes";
  props: BaseProps & {
    changeType: (tipo: "todos" | "despesa" | "receita") => void;
    tipoFiltro: "todos" | "despesa" | "receita";

    setIsFilterActive: (active: boolean) => void;
  };
}

type TopoTabelaProps = TopoTabelaCategoriaProps | TopoTabelaTransacaoProps;

const TopoTabela = ({ props, tipo }: TopoTabelaProps) => {
  if (tipo == "categorias")
    return <TopoTabelaCategoria props={props} tipo={tipo} />;
  return <TopoTabelaTransacao props={props} tipo={tipo} />;
};

export default TopoTabela;
