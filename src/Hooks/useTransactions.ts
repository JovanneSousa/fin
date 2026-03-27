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
import { TransactionType } from "../Utils/Enums/Transacao";

export interface Filters {
  categories: string[];
  recurring: boolean;
}

export type TiposColuna = "data" | "descricao" | "categoria" | "valor";

type TipoOrdenacao = "asc" | "desc";

export interface OrdenacaoTabelaTransacao {
  isActive: TiposColuna;
  type: TipoOrdenacao;
}

const useTransactions = () => {
  const [busca, setBusca] = useState<string>("");
  const [filtroModal, setFiltersModal] = useState<Filters>({
    categories: [],
    recurring: false,
  });
  const [tipo, setTipo] = useState<"todos" | "receita" | "despesa">("todos");
  const [mesSelecionado, setMesSelecionado] = useState(new Date());

  const [ordenacaoTabela, setOrdenacaoTabela] =
    useState<OrdenacaoTabelaTransacao>({
      isActive: "data",
      type: "desc",
    });

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

  const {
    getSaldoTotal: saldoTotal,
    periodoSelecionado: { loading },
  } = useSelector((state: RootReducer) => state.transactions);

  const { categorias } = useCategory();

  const filtro = useMemo(() => {
    if (tipo === "todos") return items;
    if (tipo === "receita")
      return items.filter((t) => t.type === TransactionType.Renda);
    if (tipo === "despesa")
      return items.filter((t) => t.type === TransactionType.Despesa);
    return items;
  }, [items, tipo]);

  const toggleOrdenacaoTabela = (coluna: TiposColuna) => {
    setOrdenacaoTabela((prev) => ({
      isActive: coluna,
      type:
        prev.isActive === coluna
          ? prev.type === "asc"
            ? "desc"
            : "asc"
          : "desc",
    }));
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

  const AplicaOrdenacaoPorValor = (
    filtros: OrdenacaoTabelaTransacao,
    items: Transacao[],
  ) => {
    if (filtros.type == "asc") {
      items.sort((a, b) => Math.abs(a.valor) - Math.abs(b.valor));
    } else {
      items.sort((a, b) => b.valor - a.valor);
    }
  };

  const AplicaOrdenacaoPorDescricao = (
    filtros: OrdenacaoTabelaTransacao,
    items: Transacao[],
  ) => {
    if (filtros.type == "asc") {
      items.sort((a, b) =>
        a.titulo.localeCompare(b.titulo, "pt-BR", { sensitivity: "base" }),
      );
    } else {
      items.sort((a, b) =>
        b.titulo.localeCompare(a.titulo, "pt-BR", { sensitivity: "base" }),
      );
    }
  };

  const AplicaFiltroOrdenadoPorCategoria = (
    filtros: OrdenacaoTabelaTransacao,
    items: Transacao[],
  ) => {
    if (filtros.type == "asc") {
      items.sort((a, b) => {
        const nomeA = a.categoria?.name ?? "";
        const nomeB = b.categoria?.name ?? "";
        return nomeA.localeCompare(nomeB);
      });
    } else {
      items.sort((a, b) => {
        const nomeA = a.categoria?.name ?? "";
        const nomeB = b.categoria?.name ?? "";
        return nomeB.localeCompare(nomeA);
      });
    }
  };

  const AplicaOrdenacaoPorData = (
    filtros: OrdenacaoTabelaTransacao,
    items: Transacao[],
  ) => {
    if (filtros.type == "asc") {
      items.sort(
        (a, b) =>
          new Date(a.dataMovimentacao).getTime() -
          new Date(b.dataMovimentacao).getTime(),
      );
    } else {
      items.sort(
        (a, b) =>
          new Date(b.dataMovimentacao).getTime() -
          new Date(a.dataMovimentacao).getTime(),
      );
    }
  };

  const aplicaFiltroModal = (filtro: Filters, items: Transacao[]) => {
    let list = [...items];
    if (filtro.categories.length > 0) {
      list = list.filter((i) => filtro.categories.includes(i.categoriaId));
    }
    if (filtro.recurring !== false) {
      list = list.filter((i) => i.isRecurring === filtro.recurring);
    }

    return list;
  };

  const hydratedItems = useMemo(() => {
    return filtro.map((item) => {
      if (!item.categoria) {
        const source =
          item.type === TransactionType.Renda
            ? categorias.receita
            : categorias.despesa;
        const categoria = source.find((c) => c.id === item.categoriaId);
        return { ...item, categoria };
      }
      return item;
    });
  }, [filtro, categorias.receita, categorias.despesa]);

  const itemsFiltradosPelaModal = useMemo(
    () =>
      aplicaFiltroModal(filtroModal, aplicaFiltroTexto(hydratedItems, busca)),
    [hydratedItems, busca, filtroModal],
  );

  const itemsFiltrados = useMemo(() => {
    const AplicaOrdenacao = (
      filtros: OrdenacaoTabelaTransacao,
      items: Transacao[],
    ) => {
      const list = [...items];

      if (statusPeriodo != "succeeded") return list;

      if (filtros.isActive === "data") AplicaOrdenacaoPorData(filtros, list);
      if (filtros.isActive === "valor") AplicaOrdenacaoPorValor(filtros, list);
      if (filtros.isActive === "descricao")
        AplicaOrdenacaoPorDescricao(filtros, list);
      if (filtros.isActive === "categoria")
        AplicaFiltroOrdenadoPorCategoria(filtros, list);

      return list;
    };

    return AplicaOrdenacao(ordenacaoTabela, itemsFiltradosPelaModal);
  }, [ordenacaoTabela, itemsFiltradosPelaModal, statusPeriodo]);

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

  const fetchPeriodo = (startDate: string, endDate: string) => {
    dispatch(fetchTransactionsPeriod({ startDate, endDate }));
  };

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
    ordenacaoTabela,
    toggleOrdenacaoTabela,
    filtroModal,
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
