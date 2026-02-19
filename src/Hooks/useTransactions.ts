import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootReducer } from "../Store";
import { useCallback, useMemo, useState } from "react";
import {
  createTransaction,
  fetchSaldoTotal,
  fetchTransactionsPeriod,
  fetchTransactionsPeriodoComparativo,
  getTransacao,
  updateTransaction,
  type Transacao,
} from "../Store/reducers/transactions";
import useCategory from "./useCategory";
import { normalizaTexto } from "../Utils/text";

interface Filters {
  categories: string[];
  recurring: boolean;
  sort: string;
}

const useTransactions = () => {
  const [busca, setBusca] = useState<string>("");
  const [filtroModal, setFiltersModal] = useState<Filters>({
    categories: [],
    recurring: false,
    sort: "",
  });
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
    itemById: itemPorId,
    createTrancacao,
    updateTransacao,
  } = useSelector((state: RootReducer) => state.transactions);

  const { categorias } = useCategory();

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

  const aplicaFiltroTexto = (items: Transacao[], texto: string) => {
    if (!texto.trim()) return items;

    const termo = normalizaTexto(texto);

    return items.filter(
      (item) =>
        normalizaTexto(item.titulo).includes(termo) ||
        normalizaTexto(item.categoria?.name).includes(termo) ||
        normalizaTexto(item.valor.toString()).includes(termo),
    );
  };

  const aplicaFiltroModal = (
    filtro: {
      categories: string[];
      recurring: boolean;
      sort: string;
    },
    items: Transacao[],
  ) => {
    if (filtro.categories.length > 0) {
      items = items.filter((i) => filtro.categories.includes(i.categoriaId));
    }
    if (filtro.recurring !== false) {
      items = items.filter((i) => i.isRecurring === filtro.recurring);
    }
    if (filtro.sort === "dataAsc") {
      items.sort(
        (a, b) =>
          new Date(a.dataMovimentacao).getTime() -
          new Date(b.dataMovimentacao).getTime(),
      );
    }
    if (filtro.sort === "dataDesc") {
      items.sort(
        (a, b) =>
          new Date(b.dataMovimentacao).getTime() -
          new Date(a.dataMovimentacao).getTime(),
      );
    }
    if (filtro.sort === "valorAsc") {
      items.sort((a, b) => Math.abs(a.valor) - Math.abs(b.valor));
    }
    if (filtro.sort === "valorDesc") {
      items.sort((a, b) => b.valor - a.valor);
    }

    return items;
  };

  const hydratedItems = filtro.map((item) => {
    if (!item.categoria) {
      const source = item.type === 0 ? categorias.receita : categorias.despesa;
      const categoria = source.find((c) => c.id === item.categoriaId);
      return { ...item, categoria };
    }
    return item;
  });

  const itemsFiltrados = aplicaFiltroModal(
    filtroModal,
    aplicaFiltroTexto(hydratedItems, busca),
  );

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

  const buscaPorId = useCallback(
    (id: string) => {
      dispatch(getTransacao(id));
    },
    [dispatch],
  );
  const itemById = { ...itemPorId, buscaPorId };

  const filtros = {
    onSelectMonth,
    aplicarPeriodoComparativo,
    aplicarPeriodo,
    setFiltersModal,
    aplicaFiltroTexto,
    busca,
    setBusca,
  };

  const handle = {
    onPrevMonth,
    onNextMonth,
    onPrevYear,
    onNextYear,
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

  const criaTransacao = async (transacao: Transacao) => {
    await dispatch(createTransaction(transacao)).unwrap();
  };

  const atualizarTransacao = async (transacao: Transacao) => {
    await dispatch(updateTransaction(transacao)).unwrap();
  };

  const transacaoCreate = { ...createTrancacao, criaTransacao };
  const transacaoUpdate = { ...updateTransacao, atualizarTransacao };

  return {
    transacaoUpdate,
    transacaoCreate,
    itemById,
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
