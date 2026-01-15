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
import Seletor from "../Seletor";
import { GraficoLinhaContainer, StyledLineChart } from "./styles";

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
      const mes = d.toLocaleString("pt-BR", {
        month: "short",
        timeZone: "UTC",
      });
      const ano = String(d.getUTCFullYear()).slice(-2);
      const chave = `${mes}/${ano}`;

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
  // data.length <= 1 ? (
  //   <Feedback
  //     info="Selecione um periodo de meses no seletor acima"
  //     noButton={true}
  //   />
  // ) :
  return (
    <GraficoLinhaContainer>
      <div className="title">
        <p>Comparativo Mensal</p>
        <Seletor page="comparativo" />
      </div>

      <div className="infos-container">
        <StyledLineChart
          style={{
            width: "100%",
            height: "450px",
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
              value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            }
            className="responsive-graph"
          />
          <Tooltip
            formatter={(value) =>
              value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            }
          />
          <Legend />
          <Line
            type="linear"
            dataKey="receita"
            stroke={colors.verde}
            activeDot={{ r: 8 }}
          />
          <Line type="linear" dataKey="despesa" stroke={colors.vermelho} />
        </StyledLineChart>
      </div>
    </GraficoLinhaContainer>
  );
};

export default GraficoLinha;
