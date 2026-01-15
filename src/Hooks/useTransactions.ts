import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootReducer } from "../Store";
import { useState } from "react";
import {
  fetchSaldoTotal,
  fetchTransactionsPeriod,
} from "../Store/reducers/transactions";
import useCategory from "./useCategory";

const useTransactions = () => {
  const { despesa, receita } = useCategory();
  const [tipo, setTipo] = useState<"todos" | "receita" | "despesa">("todos");
  
  const dispatch = useDispatch<AppDispatch>();

  const filtro = useSelector(
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

  const itemsFiltrados = filtro.map((item) => {
    if (!item.categoria) {
      const source = item.type === 0 ? receita : despesa;
      const categoria = source.find((c) => c.id === item.categoriaId);
      return { ...item, categoria };
    }
    return item;
  });

  return {
    itemsFiltrados,
    saldoTotal,
    loading,
    tipo,
    setTipo,
    fetchPeriodo,
  };
};

export default useTransactions;
