import { useMemo } from "react";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Seletor from "../../Seletor";
import { GraficoLinhaContainer, StyledLineChart, TitleLinha } from "./styles";
import useTransactions from "../../../Hooks/useTransactions";
import Loader from "../../Loader";
import Feedback from "../../Feedback";
import useIsMobile from "../../../Hooks/useIsMobile";
import { colors } from "../../../styles/cores";

const GraficoLinha = () => {
  const {
    itemsPeriodoComparativo: {
      itemsComparativo: items,
      statusComparativo,
      errorComparativo,
    },
  } = useTransactions();
  const isMobile = useIsMobile();

  const data = useMemo(() => {
    return items.map((item) => {
      const d = new Date(item.mes);

      const mes = d.toLocaleString("pt-BR", {
        month: "short",
        timeZone: "UTC",
      });

      const ano = String(d.getUTCFullYear()).slice(-2);

      return {
        ...item,
        mes: `${mes}/${ano}`,
      };
    });
  }, [items]);

  const isLoading = statusComparativo == "loading";
  const isError = statusComparativo == "failed";
  const isEmpty = statusComparativo == "succeeded" && items.length == 0;
  const hasData = statusComparativo == "succeeded" && items.length > 0;

  const heigth = !isMobile ? "350px" : "250px";

  return (
    <GraficoLinhaContainer>
      <TitleLinha graph="line" className="title">
        <p>Comparativo Mensal</p>
        <Seletor page="comparativo" />
      </TitleLinha>

      <div className="infos-container shadow">
        {isLoading && <Loader />}

        {isError && <Feedback error={errorComparativo} noButton={true} />}

        {isEmpty && <Feedback info="Nenhum dado encontrado" noButton={true} />}

        {hasData && (
          <StyledLineChart
            style={{
              width: "100%",
              height: heigth,
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
