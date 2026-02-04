import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarContainer } from "./styles";
import { colors } from "../../../globalStyles";
import { Title } from "../styles";
import { useMemo } from "react";
import useTransactions from "../../../Hooks/useTransactions";
import Feedback from "../../Feedback";
import Loader from "../../Loader";
import LegendaItem from "./LegendaItem";

const GraficoBarras = () => {
  const {
    itemsPeriodo: { itemsFiltrados, statusPeriodo, errorPeriodo },
  } = useTransactions();

  const { receitaTotal, despesaTotal } = useMemo(() => {
    return itemsFiltrados.reduce(
      (acc, t) => {
        if (t.type === 0) acc.receitaTotal += t.valor;
        if (t.type === 1) acc.despesaTotal += t.valor;
        return acc;
      },
      { receitaTotal: 0, despesaTotal: 0 },
    );
  }, [itemsFiltrados]);

  const nomeMes = useMemo(() => {
    if (!itemsFiltrados.length) return "";

    return new Intl.DateTimeFormat("pt-BR", {
      month: "long",
    }).format(new Date(itemsFiltrados[0].dataMovimentacao));
  }, [itemsFiltrados]);

  const data = {
    name: nomeMes,
    receita: receitaTotal,
    despesa: despesaTotal,
  };

  const isLoading = statusPeriodo == "loading";
  const isError = statusPeriodo == "failed";
  const isEmpty = statusPeriodo == "succeeded" && itemsFiltrados.length == 0;
  const hasData = statusPeriodo == "succeeded" && itemsFiltrados.length > 0;

  return (
    <BarContainer>
      <Title graph="bar">
        <p>Visão Geral</p>
      </Title>
      <div className="infos-container">
        {isLoading && <Loader legenda={false} />}

        {isError && <Feedback error={errorPeriodo} noButton={true} />}

        {isEmpty && <Feedback info="Nenhum dado encontrado" noButton={true} />}

        {hasData &&
          statusPeriodo == "succeeded" &&
          itemsFiltrados.length != 0 && (
            <ResponsiveContainer width={150} height={200}>
              <BarChart data={data ? [data] : []}>
                <XAxis dataKey="name" />
                <YAxis
                  width={45}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) =>
                    `R$ ${value.toLocaleString("pt-BR")}`
                  }
                />
                <Tooltip
                  formatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`}
                />
                <Bar dataKey="receita" fill={colors.verde} barSize={20} />
                <Bar dataKey="despesa" fill={colors.vermelho} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          )}

        <div className="legenda-container">
          <LegendaItem
            label="Receitas"
            value={receitaTotal}
            loading={isLoading}
            className="receita"
          />
          <LegendaItem
            label="Despesas"
            value={despesaTotal}
            loading={isLoading}
            className="despesa"
          />
          <LegendaItem
            label="Balanço Mensal"
            value={receitaTotal - despesaTotal}
            loading={isLoading}
          />
        </div>
      </div>
    </BarContainer>
  );
};

export default GraficoBarras;
