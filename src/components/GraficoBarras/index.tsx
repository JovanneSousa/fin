import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarContainer } from "./styles";
import { colors } from "../../globalStyles";
import type React from "react";
import Feedback from "../Feedback";

interface GraficoBarrasProps {
  data: Array<{
    name: string;
    receita: number;
    despesa: number;
  }>;
}

const GraficoBarras: React.FC<GraficoBarrasProps> = ({ data }) => {
  return data.length <= 1 ? (
    <Feedback info="Nenhum dado encontrado" noButton={true} />
  ) : (
    <BarContainer>
      <p className="title">Visão Geral</p>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`}
          />
          <Tooltip
            formatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`}
          />
          <Legend />
          <Bar dataKey="receita" fill={colors.verde} />
          <Bar dataKey="despesa" fill={colors.vermelho} />
        </BarChart>
      </ResponsiveContainer>
    </BarContainer>
  );
};

export default GraficoBarras;
