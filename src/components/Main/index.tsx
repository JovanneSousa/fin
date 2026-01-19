import { useEffect } from "react";
import useTransactions from "../../Hooks/useTransactions";
import ContainerCategories from "../ContainerCategories";
import Dashboards from "../Dashboards";
import { MainSection } from "./styles";
import { subtraiMeses, ultimoDiaMesAtual } from "../../Utils/Datas";

const Main = () => {
  const {
    itemsPeriodo: { statusPeriodo },
    itemsPeriodoComparativo: { statusComparativo },
    filtros: { aplicarPeriodoComparativo, aplicarPeriodo },
    categorias: { buscaCategorias, status },
  } = useTransactions();
  // busca dados de transações
  useEffect(() => {
    if (statusPeriodo == "idle") {
      const inicio = subtraiMeses(ultimoDiaMesAtual(), 1);
      const fim = ultimoDiaMesAtual();
      aplicarPeriodo(inicio, fim);
    }
  }, [statusPeriodo, aplicarPeriodo]);

  // busca dados de gráfico de linha
  useEffect(() => {
    if (statusComparativo == "idle") aplicarPeriodoComparativo(3);
  }, [statusComparativo, aplicarPeriodoComparativo]);

  // busca as categorias
  useEffect(() => {
    if (status == "idle") buscaCategorias();
  }, [status, buscaCategorias]);
  return (
    <MainSection>
      {/* <Seletor page="main"/> */}
      <ContainerCategories />
      <Dashboards />
    </MainSection>
  );
};
export default Main;
