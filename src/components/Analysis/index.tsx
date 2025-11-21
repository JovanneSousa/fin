import { useState } from "react";
import New from "../New";
import { Analysis } from "./styles";
import Categories from "../Categories";
type tabKey = "new" | "categories"

const AnalysisSection = () => {
  const [activeTab, setActiveTab] = useState<tabKey>("new");
  const Components = {
    new: <New />,
    categories: <Categories />,
  };
  return (
    <Analysis>
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
          <li>Comparação</li>
          <li>Projeção</li>
        </ul>
      </nav>
      <div className="container-analysis">
        <div></div>
        {Components[activeTab]}
      </div>
    </Analysis>
  );
};

export default AnalysisSection;
