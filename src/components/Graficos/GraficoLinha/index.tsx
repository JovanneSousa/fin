import { useMemo } from "react";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { colors } from "../../../globalStyles";
import Seletor from "../../Seletor";
import { GraficoLinhaContainer, StyledLineChart } from "./styles";
import { Title } from "../styles";
import useTransactions from "../../../Hooks/useTransactions";

const GraficoLinha = () => {
  const {
    itemsPeriodoComparativo: { itemsComparativo: items },
  } = useTransactions();

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
      <Title graph="line" className="title">
        <p>Comparativo Mensal</p>
        <Seletor page="comparativo" />
      </Title>

      <div className="infos-container">
        <StyledLineChart
          style={{
            width: "100%",
            height: "350px",
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
