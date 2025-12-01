import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { RootReducer } from "../../Store";
import { colors } from "../../globalStyles";

const GraficoLinha = () => {
  const { items } = useSelector((state: RootReducer) => state.transactions);

  const data = useMemo(() => {
    const mapa = new Map<string, { receita: number; despesa: number }>();

    const itensOrdenados = [...items].sort((a, b) => {
      return (
        new Date(a.dataMovimentacao).getTime() -
        new Date(b.dataMovimentacao).getTime()
      );
    });

    itensOrdenados.forEach((item) => {
      const d = new Date(item.dataMovimentacao);
      const chave = `${d.toLocaleString("pt-BR", { month: "short" })}/${String(
        d.getFullYear()
      ).slice(-2)}`;

      const atual = mapa.get(chave) ?? { receita: 0, despesa: 0 };

      if (item.type === 0) {
        atual.receita += item.valor;
      } else if (item.type === 1) {
        atual.despesa += item.valor;
      }

      mapa.set(chave, atual);
    });

    return Array.from(mapa.entries()).map(([mes, { receita, despesa }]) => ({
      mes,
      receita,
      despesa,
    }));
  }, [items]);

  console.log(data);

  return (
    <LineChart
      style={{
        width: "100%",
        height: "85%",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="mes" />
      <YAxis
        width="auto"
        tickFormatter={(value) =>
          value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        }
      />
      <Tooltip
        formatter={(value) =>
          value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        }
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="receita"
        stroke={colors.verde}
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="despesa" stroke={colors.vermelho} />
    </LineChart>
  );
};

export default GraficoLinha;
