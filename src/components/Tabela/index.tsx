import TransacaoTabela from "./TransacaoTabela";
import { CategoriaTabela } from "./CategoriaTabela";

export type TabelaProps = {
  type: "transacoes" | "categorias";
};

const Tabela = ({ type }: TabelaProps) => {
  return type == "categorias" ? (
    <CategoriaTabela />
  ) : (
    <TransacaoTabela />
  );
};

export default Tabela;
