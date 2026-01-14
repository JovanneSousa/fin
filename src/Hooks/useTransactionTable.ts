import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTransacao, type Transacao } from "../Store/reducers/transactions";
import type { AppDispatch } from "../Store";
import useTransactions from "./useTransactions";
import { usePaginacao } from "./usePaginacao";

export const useTransactionTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { itemsFiltrados, setTipo, tipo } = useTransactions();
  const paginacao = usePaginacao(itemsFiltrados);

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<Transacao | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);
  const [valorBusca, setValorBusca] = useState("");

  const abreBusca = () => {
    setIsSearching(true);
    console.log(isSearching);
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
    setIsOpen(true);
  };

  const fecharDetalhes = () => {
    setIsOpen(false);
  };

  const changeType = (tipo: "todos" | "receita" | "despesa") => {
    setTipo(tipo);
    paginacao.primeiraPagina();
  };

  return {
    isOpen,
    isDeleteModalOpen,
    itemSelecionado,
    valorBusca,
    isSearching,
    tipo,
    paginacao,
    setValorBusca,
    fechaBusca,
    abreBusca,
    setIsDeleteModalOpen,
    setItemSelecionado,
    abrirDetalhes,
    fecharDetalhes,
    changeType,
  };
};

export type UseTableTransactionReturn = ReturnType<typeof useTransactionTable>;
