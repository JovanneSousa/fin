import { useState } from "react";
import GraficoBarras from "../GraficoBarras";
import { useSelector } from "react-redux";
import type { RootReducer } from "../../Store";
import GraficoRosca from "../GraficoRosca";
import Button from "../Button";
import { colors } from "../../globalStyles";
import { DashboardsSection } from "./styles";

const Dashboards = () => {
  const [isReceita, setIsReceita] = useState(false);
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
        <div className="conteudo">
          <div className="title-container">
            <p>{isReceita ? "Ganhos por categoria" : "Gastos por categoria"}</p>
            <div className="button-container">
              <Button
                bgColor={!isReceita ? colors.vermelho : colors.lightGray}
                padding="small"
                type="button"
                children="Despesa"
                onClick={() => setIsReceita(false)}
              />
              <Button
                bgColor={isReceita ? colors.verde : colors.lightGray}
                padding="small"
                type="button"
                children="Receita"
                onClick={() => setIsReceita(true)}
              />
            </div>
          </div>
          <GraficoRosca tipo={isReceita ? 0 : 1} />
        </div>
      </div>
    </DashboardsSection>
  );
};

export default Dashboards;
