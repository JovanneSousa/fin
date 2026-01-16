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
import { formatCurrency } from "../../../Utils";
import { Title } from "../styles";
import { useMemo } from "react";
import useTransactions from "../../../Hooks/useTransactions";

const GraficoBarras = () => {
  const {
    itemsPeriodo: { itemsFiltrados },
  } = useTransactions();

  const { receitaTotal, despesaTotal } = useMemo(() => {
    return itemsFiltrados.reduce(
      (acc, t) => {
        if (t.type === 0) acc.receitaTotal += t.valor;
        if (t.type === 1) acc.despesaTotal += t.valor;
        return acc;
      },
      { receitaTotal: 0, despesaTotal: 0 }
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

  return (
    <BarContainer>
      <Title graph="bar">
        <p>Visão Geral</p>
      </Title>
      <div className="infos-container">
        <ResponsiveContainer width={150} height={200}>
          <BarChart data={data ? [data] : []}>
            <XAxis dataKey="name" />
            <YAxis
              width={45}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`}
            />
            <Tooltip
              formatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`}
            />
            <Bar dataKey="receita" fill={colors.verde} barSize={20} />
            <Bar dataKey="despesa" fill={colors.vermelho} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
        <div className="legenda-container">
          <div className="legenda-item">
            <p>Receitas</p>
            <p className="receita">{formatCurrency(data.receita)}</p>
          </div>
          <div className="legenda-item">
            <p>Despesas</p>
            <p className="despesa">{formatCurrency(data.despesa)}</p>
          </div>
          <div className="legenda-item">
            <p>Balanço Mensal</p>
            <p>{formatCurrency(data.receita - data.despesa)}</p>
          </div>
        </div>
      </div>
    </BarContainer>
  );
};

export default GraficoBarras;
