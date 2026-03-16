import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "../../../Utils";
import Feedback from "../../Feedback";
import useTransactions from "../../../Hooks/useTransactions";
import { ContainerCor, GraficoRoscaContainer } from "./styles";
import Button from "../../Button";
import { Title } from "../styles";
import Loader from "../../Loader";
import { useTheme } from "styled-components";
import { colors } from "../../../styles/cores";

type TipoGrafico = "receita" | "despesa";

const GraficoRosca = () => {
  const theme = useTheme();
  const [typeCategoria, setTypeCategoria] = useState<TipoGrafico>("despesa");
  const {
    itemsPeriodo: { itemsFiltrados, statusPeriodo, errorPeriodo },
  } = useTransactions();

  const tipo = typeCategoria === "receita" ? 0 : 1;

  const titulo = {
    despesa: "Gastos por categoria",
    receita: "Ganhos por categoria",
  };

  const data = useMemo(() => {
    const transacoesFiltradasPorTipo = itemsFiltrados.filter(
      (t) => t.type === tipo,
    );

    const mapa = new Map<string, { value: number; color: string }>();
    transacoesFiltradasPorTipo.forEach((t) => {
      const nomeCategoria = t.categoria?.name || "Sem categoria";
      const cor = t.categoria?.cor.url || theme.gray;

      const atual = mapa.get(nomeCategoria);

      if (atual) {
        mapa.set(nomeCategoria, {
          value: atual.value + t.valor,
          color: atual.color ?? cor,
        });
      } else {
        mapa.set(nomeCategoria, {
          value: t.valor,
          color: cor,
        });
      }
    });

    return Array.from(mapa.entries())
      .sort((a, b) => b[1].value - a[1].value)
      .map(([name, { value, color }]) => ({
        name,
        value,
        color,
      }));
  }, [itemsFiltrados, tipo, theme]);

  const isLoading = statusPeriodo == "loading";
  const isError = statusPeriodo == "failed";
  const isEmpty = statusPeriodo == "succeeded" && data.length == 0;
  const hasData = statusPeriodo == "succeeded" && data.length > 0;

  return (
    <GraficoRoscaContainer>
      <Title graph="rosca">
        <p>{titulo[typeCategoria]}</p>
        <div className="button-container">
          <Button
            className="shadow"
            bgColor={
              typeCategoria == "despesa" ? colors.vermelho : theme.lightGray
            }
            padding="small"
            onClick={() => setTypeCategoria("despesa")}
          >
            Despesa
          </Button>
          <Button
            className="shadow"
            bgColor={
              typeCategoria == "receita" ? colors.verde : theme.lightGray
            }
            padding="small"
            onClick={() => setTypeCategoria("receita")}
          >
            Receita
          </Button>
        </div>
      </Title>
      <div className="infos-container shadow">
        {isLoading && <Loader legenda={false} />}
        {isEmpty && <Feedback info="Nenhum dado encontrado" noButton={true} />}
        {isError && <Feedback error={errorPeriodo} noButton={true} />}
        {hasData && (
          <>
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
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="legenda-container">
              {data.slice(0, 5).map((c) => (
                <div key={c.name} className="legenda-item">
                  <div>
                    <ContainerCor bg={c.color} />
                    {c.name}
                  </div>
                  <p className={typeCategoria}>{formatCurrency(c.value)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </GraficoRoscaContainer>
  );
};

export default GraficoRosca;
