import GraficoBarras from "../Graficos/GraficoBarras";
import GraficoRosca from "../Graficos/GraficoRosca";
import { DashboardsSection } from "./styles";
import GraficoLinha from "../Graficos/GraficoLinha";
import { useEffect } from "react";
import useTransactions from "../../Hooks/useTransactions";
import { subtraiMeses, ultimoDiaMesAtual } from "../../Utils/Datas";

const Dashboards = () => {
  const {
    itemsPeriodo: { successPeriodo },
    itemsPeriodoComparativo: { successComparativo },
    filtros: { aplicarPeriodoComparativo, aplicarPeriodo },
    categorias: { buscaCategorias, despesa, receita },
  } = useTransactions();

  // busca dados de transações
  useEffect(() => {
    if (!successPeriodo) {
      const inicio = subtraiMeses(ultimoDiaMesAtual(), 1);
      const fim = ultimoDiaMesAtual();
      aplicarPeriodo(inicio, fim);
    }
  }, [successPeriodo, aplicarPeriodo]);

  // busca dados de gráfico de linha
  useEffect(() => {
    if (!successComparativo) aplicarPeriodoComparativo(3);
  }, [successComparativo, aplicarPeriodoComparativo]);

  // busca as categorias
  useEffect(() => {
    if (receita.length == 0 && despesa.length == 0) buscaCategorias();
  }, [receita, despesa, buscaCategorias]);

  return (
    <DashboardsSection>
      <div className="container-analysis">
        <GraficoBarras />
        <GraficoRosca />
        <GraficoLinha />
      </div>
    </DashboardsSection>
  );
};

export default Dashboards;
