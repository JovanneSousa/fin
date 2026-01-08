import { colors } from "../../globalStyles";
import { tiposCard } from "../../Utils";

export const cardConfig = {
  [tiposCard.receita]: {
    title: "Receita",
    className: "receita",
    color: colors.verde,
    icon: "+",
  },
  [tiposCard.despesa]: {
    title: "Despesa",
    className: "despesa",
    color: colors.vermelho,
    icon: "-",
  },
  [tiposCard.saldoAtual]: {
    title: "Saldo Atual",
    className: "saldo",
    color: colors.azul,
    icon: "$",
  },
  [tiposCard.balanco]: {
    title: "Balanço mensal",
    className: "saldo",
    color: colors.azul,
    icon: "±",
  },
} as const;