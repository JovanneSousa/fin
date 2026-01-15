import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../../Utils";
import Feedback from "../Feedback";
import useTransactions from "../../Hooks/useTransactions";
import { ContainerCor, GraficoRoscaContainer } from "./styles";
import Button from "../Button";
import { colors } from "../../globalStyles";

const DESPESA_COLORS = [
  "#e63946",
  "#ff6b6b",
  "#c850c0",
  "#d6336c",
  "#9b59b6",
  "#8e44ad",
  "#f06292",
  "#ff4d4d",
];

const RECEITA_COLORS = [
  "#57b846",
  "#6fcf97",
  "#27ae60",
  "#3498db",
  "#5dade2",
  "#f39c12",
  "#f1c40f",
  "#2ecc71",
];

type TipoGrafico = "receita" | "despesa";

const GraficoRosca = () => {
  const [typeCategoria, setTypeCategoria] = useState<TipoGrafico>("despesa");
  const { itemsFiltrados } = useTransactions();

  const tipo = typeCategoria === "receita" ? 0 : 1;

  const titulo = {
    despesa: "Gastos por categoria",
    receita: "Ganhos por categoria",
  };

  const data = useMemo(() => {
    const transacoesFiltradasPorTipo = itemsFiltrados.filter(
      (t) => t.type === tipo
    );

    const mapa = new Map<string, number>();
    transacoesFiltradasPorTipo.forEach((t) => {
      const nomeCategoria = t.categoria?.name || "Sem categoria";
      mapa.set(nomeCategoria, (mapa.get(nomeCategoria) || 0) + t.valor);
    });

    return Array.from(mapa.entries()).map(([name, value]) => ({
      name,
      value,
    }));
  }, [itemsFiltrados, tipo]);

  const COLORS = tipo === 0 ? RECEITA_COLORS : DESPESA_COLORS;

  return data.length == 0 ? (
    <Feedback info="Nenhum dado encontrado" noButton={true} />
  ) : (
    <GraficoRoscaContainer>
      <div className="title">
        <p>{titulo[typeCategoria]}</p>
        <div className="button-container">
          <Button
            bgColor={
              typeCategoria == "despesa" ? colors.vermelho : colors.lightGray
            }
            padding="small"
            onClick={() => setTypeCategoria("despesa")}
          >
            Despesa
          </Button>
          <Button
            bgColor={
              typeCategoria == "receita" ? colors.verde : colors.lightGray
            }
            padding="small"
            onClick={() => setTypeCategoria("receita")}
          >
            Receita
          </Button>
        </div>
      </div>
      <div className="infos-container">
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="legenda-container">
          {data.map((c, index) => (
            <div key={c.name} className="legenda-item">
              <p>
                <ContainerCor bg={COLORS[index % COLORS.length]} />

                {c.name}
              </p>
              <p className={typeCategoria}>{formatCurrency(c.value)}</p>
            </div>
          ))}
        </div>
      </div>
    </GraficoRoscaContainer>
  );
};

export default GraficoRosca;
