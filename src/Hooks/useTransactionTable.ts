import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTransacao, type Transacao } from "../Store/reducers/transactions";
import type { AppDispatch } from "../Store";
import useTransactions from "./useTransactions";

export const useTransactionTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, setTipo, tipo } = useTransactions();

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

  return {
    items,
    isOpen,
    isDeleteModalOpen,
    itemSelecionado,
    valorBusca,
    isSearching,
    tipo,
    setValorBusca,
    fechaBusca,
    abreBusca,
    setIsDeleteModalOpen,
    setItemSelecionado,
    abrirDetalhes,
    fecharDetalhes,
    setTipo,
  };
};

export type UseTableTransactionReturn = ReturnType<typeof useTransactionTable>;
