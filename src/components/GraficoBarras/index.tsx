import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarContainer } from "./styles";
import { colors } from "../../globalStyles";
import { formatCurrency } from "../../Utils";

interface GraficoBarrasProps {
  data: Array<{
    name: string;
    receita: number;
    despesa: number;
  }>;
}

const GraficoBarras = ({ data }: GraficoBarrasProps) => {
  const totalReceita = data.reduce((acc, r) => acc + r.receita, 0);
  const totalDespesa = data.reduce((acc, d) => acc + d.despesa, 0);

  return (
    <BarContainer>
      <p className="title">Visão Geral</p>
      <div className="infos-container">
        <ResponsiveContainer width={150} height={200}>
          <BarChart data={data}>
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
            <p className="receita">{formatCurrency(totalReceita)}</p>
          </div>
          <div className="legenda-item">
            <p>Despesas</p>
            <p className="despesa">{formatCurrency(totalDespesa)}</p>
          </div>
          <div className="legenda-item">
            <p>Balanço Mensal</p>
            <p>{formatCurrency(totalReceita - totalDespesa)}</p>
          </div>
        </div>
      </div>
    </BarContainer>
  );
};

export default GraficoBarras;
