import TopoCategoria from "./TopoCategoria";
import TopoTransacao from "./TopoTransacao";

export type TopoTabelaBaseProps = {
  type: "transacoes" | "categorias";
};

const TopoTabela = ({ type }: TopoTabelaBaseProps) => {
  if (type == "transacoes") return <TopoTransacao />;
  return <TopoCategoria />;
};

export default TopoTabela;
