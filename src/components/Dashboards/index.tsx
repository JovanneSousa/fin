import GraficoBarras from "../Graficos/GraficoBarras";
import GraficoRosca from "../Graficos/GraficoRosca";
import { DashboardsSection } from "./styles";
import GraficoLinha from "../Graficos/GraficoLinha";

const Dashboards = () => {
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
