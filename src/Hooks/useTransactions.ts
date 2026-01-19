import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootReducer } from "../Store";
import { useCallback, useMemo, useState } from "react";
import {
  fetchSaldoTotal,
  fetchTransactionsPeriod,
  fetchTransactionsPeriodoComparativo,
} from "../Store/reducers/transactions";
import useCategory from "./useCategory";

const useTransactions = () => {
  const [tipo, setTipo] = useState<"todos" | "receita" | "despesa">("todos");
  const [mesSelecionado, setMesSelecionado] = useState(new Date());

  const dispatch = useDispatch<AppDispatch>();
  const {
    periodoSelecionado: { items, status: statusPeriodo, error: errorPeriodo },
    periodoComparativo: {
      items: itemsComparativo,
      status: statusComparativo,
      error: errorComparativo,
    },
  } = useSelector((state: RootReducer) => state.transactions);

  const { despesa, receita, buscaCategorias, status } = useCategory();

  const filtro = useMemo(() => {
    if (tipo === "todos") return items;
    if (tipo === "receita") return items.filter((t) => t.type === 0);
    if (tipo === "despesa") return items.filter((t) => t.type === 1);
    return items;
  }, [items, tipo]);

  const {
    getSaldoTotal: saldoTotal,
    periodoSelecionado: { loading },
  } = useSelector((state: RootReducer) => state.transactions);

  const fetchPeriodo = (startDate: string, endDate: string) => {
    dispatch(fetchTransactionsPeriod({ startDate, endDate }));
  };

  const itemsFiltrados = filtro.map((item) => {
    if (!item.categoria) {
      const source = item.type === 0 ? receita : despesa;
      const categoria = source.find((c) => c.id === item.categoriaId);
      return { ...item, categoria };
    }
    return item;
  });

  const aplicarMes = (date: Date) => {
    setMesSelecionado(date);

    const inicioMes = new Date(date.getFullYear(), date.getMonth(), 1);
    const fimMes = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    dispatch(
      fetchTransactionsPeriod({
        startDate: inicioMes.toISOString(),
        endDate: fimMes.toISOString(),
      }),
    );
  };

  const aplicarPeriodo = (inicio: Date, fim: Date) => {
    dispatch(
      fetchTransactionsPeriod({
        startDate: inicio.toISOString(),
        endDate: fim.toISOString(),
      }),
    );
  };

  const aplicarPeriodoComparativo = useCallback(
    (qtdMeses: number) => {
      dispatch(fetchTransactionsPeriodoComparativo(qtdMeses));
    },
    [dispatch],
  );

  const buscaSaldoTotal = () => {
    dispatch(fetchSaldoTotal());
  };

  const onSelectMonth = (month: number) =>
    aplicarMes(new Date(mesSelecionado.getFullYear(), month, 1));

  const onPrevMonth = () =>
    aplicarMes(
      new Date(mesSelecionado.getFullYear(), mesSelecionado.getMonth() - 1, 1),
    );

  const onNextMonth = () =>
    aplicarMes(
      new Date(mesSelecionado.getFullYear(), mesSelecionado.getMonth() + 1, 1),
    );
  const onPrevYear = () =>
    setMesSelecionado(
      new Date(mesSelecionado.getFullYear() - 1, mesSelecionado.getMonth(), 1),
    );

  const onNextYear = () =>
    setMesSelecionado(
      new Date(mesSelecionado.getFullYear() + 1, mesSelecionado.getMonth(), 1),
    );

  const filtros = {
    onSelectMonth,
    aplicarPeriodoComparativo,
    aplicarPeriodo,
  };

  const handle = {
    onPrevMonth,
    onNextMonth,
    onPrevYear,
    onNextYear,
  };

  const categorias = {
    receita,
    despesa,
    buscaCategorias,
    status,
  };

  const itemsPeriodo = {
    itemsFiltrados,
    statusPeriodo,
    errorPeriodo,
  };

  const itemsPeriodoComparativo = {
    itemsComparativo,
    statusComparativo,
    errorComparativo,
  };

  // const criarFiltroMesAtual = useCallback(() => {
  //   const hoje = new Date();
  //   const inicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  //   const fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
  //   return criarFiltro(inicio, fim);
  // }, []);

  return {
    categorias,
    itemsPeriodo,
    itemsPeriodoComparativo,
    saldoTotal,
    loading,
    tipo,
    mesSelecionado,
    handle,
    filtros,
    buscaSaldoTotal,
    setTipo,
    fetchPeriodo,
  };
};

export default useTransactions;
