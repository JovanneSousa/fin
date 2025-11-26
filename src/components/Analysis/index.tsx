import { useState } from "react";
import New from "../New";
import { Analysis } from "./styles";
import Categories from "../Categories";
import GraficoBarras from "../GraficoBarras";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import type { RootReducer } from "../../Store";
import Feedback from "../Feedback";
import GraficoRosca from "../GraficoRosca";
import Button from "../Button";
import { colors } from "../../globalStyles";

type tabKey = "new" | "categories" | "comparacao";

const AnalysisSection = () => {
  const [isReceita, setIsReceita] = useState(true);
  const { loadingGet, errorGet, items } = useSelector(
    (state: RootReducer) => state.transactions
  );

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

  const [activeTab, setActiveTab] = useState<tabKey>("new");
  const Components = {
    new: <New />,
    categories: <Categories />,
    comparacao: null,
  };

  return (
    <Analysis isComparison={activeTab === "comparacao"}>
      <nav>
        <ul>
          <li
            className={activeTab === "new" ? "is-active" : ""}
            onClick={() => setActiveTab("new")}
          >
            Visão Geral
          </li>
          <li
            className={activeTab === "categories" ? "is-active" : ""}
            onClick={() => setActiveTab("categories")}
          >
            Categorias
          </li>
          <li
            className={activeTab === "comparacao" ? "is-active" : ""}
            onClick={() => setActiveTab("comparacao")}
          >
            Comparação
          </li>
          <li>Projeção</li>
        </ul>
      </nav>
      <div className="container-analysis">
        <div className="conteudo">
          {activeTab === "categories" ? (
            <>
              <div className="title-container">
                <p>
                  {isReceita ? "Ganhos por categoria" : "Gastos por categoria"}
                </p>
                <div className="button-container">
                  <Button
                    bgColor={isReceita ? colors.verde : colors.lightGray}
                    padding="small"
                    type="button"
                    children="Receita"
                    onClick={() => setIsReceita(true)}
                  />
                  <Button
                    bgColor={!isReceita ? colors.vermelho : colors.lightGray}
                    padding="small"
                    type="button"
                    children="Despesa"
                    onClick={() => setIsReceita(false)}
                  />
                </div>
              </div>
              <GraficoRosca tipo={isReceita ? 0 : 1} />
            </>
          ) : loadingGet ? (
            <Loader />
          ) : errorGet ? (
            <Feedback error={errorGet} />
          ) : (
            <GraficoBarras data={data} />
          )}
        </div>
        {Components[activeTab]}
      </div>
    </Analysis>
  );
};

export default AnalysisSection;
