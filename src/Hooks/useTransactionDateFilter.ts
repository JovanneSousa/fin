import { useDispatch } from "react-redux";
import { fetchTransactionsPeriod } from "../Store/reducers/transactions";
import type { AppDispatch } from "../Store";
import { useCallback, useEffect, useState } from "react";
import { criarFiltro } from "../Utils/transactionFilter";

export const useTransactionDateFilter = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [mesSelecionado, setMesSelecionado] = useState(new Date());
  const [titlePeriod, setTitlePeriod] = useState(false);
  const [pillAtiva, setPillAtiva] = useState<string | null>("mes-atual");

  const aplicarMes = (date: Date) => {
    setMesSelecionado(date);
    setTitlePeriod(false);

    const inicio = new Date(date.getFullYear(), date.getMonth(), 1);
    const fim = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    dispatch(
      fetchTransactionsPeriod({
        startDate: inicio.toISOString(),
        endDate: fim.toISOString(),
      })
    );
  };

  const aplicarPeriodo = (inicio: Date, fim: Date) => {
    setTitlePeriod(true);
    setPillAtiva(null);

    dispatch(
      fetchTransactionsPeriod({
        startDate: inicio.toISOString(),
        endDate: fim.toISOString(),
      })
    );
  };

  const onPrevMonth = () => {
    aplicarMes(
      new Date(mesSelecionado.getFullYear(), mesSelecionado.getMonth() - 1, 1)
    );
  };

  const onNextMonth = () => {
    aplicarMes(
      new Date(mesSelecionado.getFullYear(), mesSelecionado.getMonth() + 1, 1)
    );
  };

  const onPrevYear = () => {
    setMesSelecionado(
      new Date(mesSelecionado.getFullYear() - 1, mesSelecionado.getMonth(), 1)
    );
  };

  const onNextYear = () => {
    setMesSelecionado(
      new Date(mesSelecionado.getFullYear() + 1, mesSelecionado.getMonth(), 1)
    );
  };

  const onSelectMonth = (month: number) =>
    aplicarMes(new Date(mesSelecionado.getFullYear(), month, 1));

  const criarFiltroMesAtual = useCallback(() => {
    const hoje = new Date();
    const inicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
    return criarFiltro(inicio, fim);
  }, []);

  useEffect(() => {
    dispatch(fetchTransactionsPeriod(criarFiltroMesAtual()));
  }, [criarFiltroMesAtual, dispatch]);

  return {
    mesSelecionado,
    titlePeriod,
    pillAtiva,

    setPillAtiva,
    onPrevMonth,
    onNextMonth,
    onPrevYear,
    onNextYear,
    onSelectMonth,
    aplicarMes,
    aplicarPeriodo,
    criarFiltroMesAtual,
  };
};
