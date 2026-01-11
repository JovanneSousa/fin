import type { TransactionFilter } from "../Store/reducers/transactions";

export const criarFiltro = (
  inicio: Date,
  fim: Date
): TransactionFilter => ({
  startDate: inicio.toISOString(),
  endDate: fim.toISOString(),
});