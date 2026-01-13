import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootReducer } from "../Store";
import { useState } from "react";
import {
  fetchSaldoTotal,
  fetchTransactionsPeriod,
} from "../Store/reducers/transactions";

const useTransactions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [tipo, setTipo] = useState<"todos" | "receita" | "despesa">("todos");

  const items = useSelector(
    (state: RootReducer) => state.transactions.items
  ).filter((t) => {
    if (tipo === "todos") return true;
    if (tipo === "receita") return t.type === 0;
    if (tipo === "despesa") return t.type === 1;
    return true;
  });

  const saldoTotal = useSelector(
    (state: RootReducer) => state.transactions.getSaldoTotal
  );

  const loading = useSelector(
    (state: RootReducer) => state.transactions.loadingGet
  );

  const fetchPeriodo = (startDate: string, endDate: string) => {
    dispatch(fetchTransactionsPeriod({ startDate, endDate }));
    dispatch(fetchSaldoTotal());
  };

  return {
    items,
    saldoTotal,
    loading,
    tipo,
    setTipo,
    fetchPeriodo,
  };
};

export default useTransactions;
