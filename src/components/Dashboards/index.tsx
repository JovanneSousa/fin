import GraficoBarras from "../GraficoBarras";
import { useSelector } from "react-redux";
import type { RootReducer } from "../../Store";
import GraficoRosca from "../GraficoRosca";
import { DashboardsSection } from "./styles";

const Dashboards = () => {
  const { items } = useSelector((state: RootReducer) => state.transactions);

  const valorTotalReceita = items.reduce((acc, t) => {
    return t.type === 0 ? acc + t.valor : acc;
  }, 0);

  const valorTotalDespesa = items.reduce((acc, t) => {
    return t.type === 1 ? acc + t.valor : acc;
  }, 0);

  const data = [
    {
      name: "Mês",
      receita: valorTotalReceita,
      despesa: valorTotalDespesa,
    },
  ];

  return (
    <DashboardsSection>
      <div className="container-analysis">
        <GraficoBarras data={data} />
        <GraficoRosca />
      </div>
    </DashboardsSection>
  );
};

export default Dashboards;
