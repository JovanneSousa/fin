import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { RootReducer } from "../../Store";
import { formatCurrency } from "../../Utils";
import Feedback from "../Feedback";

const DESPESA_COLORS = [
  "#e63946",
  "#ff6b6b",
  "#c850c0",
  "#d6336c",
  "#9b59b6",
  "#8e44ad",
  "#f06292",
  "#ff4d4d",
];

const RECEITA_COLORS = [
  "#57b846",
  "#6fcf97",
  "#27ae60",
  "#3498db",
  "#5dade2",
  "#f39c12",
  "#f1c40f",
  "#2ecc71",
];

interface GraficoRoscaProps {
  tipo: 0 | 1;
}

const GraficoRosca: React.FC<GraficoRoscaProps> = ({ tipo }) => {
  const { despesa, receita } = useSelector(
    (state: RootReducer) => state.categories
  );
  const { items } = useSelector((state: RootReducer) => state.transactions);

  const data = useMemo(() => {
    const transacoesFiltradas = items.filter((t) => t.type === tipo);

    const filtered = transacoesFiltradas.map((item) => {
      if (!item.categoria) {
        const source = item.type === 0 ? receita : despesa;
        const categoria = source.find((c) => c.id === item.categoriaId);
        return { ...item, categoria };
      }
      return item;
    });

    const mapa = new Map<string, number>();
    filtered.forEach((t) => {
      const nomeCategoria = t.categoria?.name || "Sem categoria";
      mapa.set(nomeCategoria, (mapa.get(nomeCategoria) || 0) + t.valor);
    });

    return Array.from(mapa.entries()).map(([name, value]) => ({
      name,
      value,
    }));
  }, [items, tipo, receita, despesa]);

  const COLORS = tipo === 0 ? RECEITA_COLORS : DESPESA_COLORS;

  return data.length == 0 ? (
    <Feedback info="Nenhum dado encontrado" noButton={true} />
  ) : (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={120}
          label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GraficoRosca;
