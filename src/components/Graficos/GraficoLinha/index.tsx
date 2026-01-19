import { useMemo } from "react";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { colors } from "../../../globalStyles";
import Seletor from "../../Seletor";
import { GraficoLinhaContainer, StyledLineChart } from "./styles";
import { Title } from "../styles";
import useTransactions from "../../../Hooks/useTransactions";
import Loader from "../../Loader";
import Feedback from "../../Feedback";

const GraficoLinha = () => {
  const {
    itemsPeriodoComparativo: { itemsComparativo: items, statusComparativo, errorComparativo },
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

  const isLoading = statusComparativo == "loading";
  const isError = statusComparativo == "failed";
  const isEmpty = statusComparativo == "succeeded" && data.length == 0;
  const hasData = statusComparativo == "succeeded" && data.length > 0;

  return (
    <GraficoLinhaContainer>
      <Title graph="line" className="title">
        <p>Comparativo Mensal</p>
        <Seletor page="comparativo" />
      </Title>


      <div className="infos-container">
      {isLoading && <Loader />}

      {isError && <Feedback error={errorComparativo} noButton={true} />}

      {isEmpty && <Feedback info="Nenhum dado encontrado" noButton={true} />}
      
      {hasData && (
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
            <XAxis tickMargin={12} fontSize={"14px"} dataKey="mes" />
            <YAxis
              width="auto"
              fontSize={"14px"}
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
            <Legend iconType="triangle" />
            <Line
              type="linear"
              dataKey="receita"
              strokeWidth={2}
              stroke={colors.verde}
              activeDot={{ r: 6 }}
              dot={false}
              animationDuration={600}
              animationEasing="ease-out"
              connectNulls
              z={2}
            />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="despesa"
              stroke={colors.vermelho}
              activeDot={{ r: 6 }}
              dot={false}
              animationDuration={600}
              animationEasing="ease-out"
              connectNulls
              z={2}
            />
          </StyledLineChart>
      )}
      </div>
    </GraficoLinhaContainer>
  );
};

export default GraficoLinha;
