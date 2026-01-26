import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTransacao, type Transacao } from "../Store/reducers/transactions";
import type { AppDispatch } from "../Store";
import useTransactions from "./useTransactions";
import { usePaginacao } from "./usePaginacao";
import { useFormNew } from "../contexts/FormNew/useFormNew";

export const useTransactionTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    itemsPeriodo: { itemsFiltrados, statusPeriodo, errorPeriodo },
    setTipo,
    tipo,
  } = useTransactions();

  const { abreModal } = useFormNew();

  const paginacao = usePaginacao(itemsFiltrados);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<Transacao | null>(
    null,
  );
  const [isSearching, setIsSearching] = useState(false);
  const [valorBusca, setValorBusca] = useState("");

  const abreBusca = () => {
    setIsSearching(true);
  };

  const fechaBusca = () => {
    if (isSearching) {
      setIsSearching(false);
      setValorBusca("");
    }
    return;
  };

  const abrirDetalhes = (id: string) => {
    dispatch(getTransacao(id));
    abreModal("editTransacao");
  };

  const changeType = (tipo: "todos" | "receita" | "despesa") => {
    setTipo(tipo);
    paginacao.primeiraPagina();
  };

  return {
    isDeleteModalOpen,
    itemSelecionado,
    valorBusca,
    isSearching,
    tipo,
    paginacao,
    statusPeriodo,
    errorPeriodo,
    setValorBusca,
    abrirDetalhes,
    fechaBusca,
    abreBusca,
    setIsDeleteModalOpen,
    setItemSelecionado,
    changeType,
  };
};

export type UseTableTransactionReturn = ReturnType<typeof useTransactionTable>;
