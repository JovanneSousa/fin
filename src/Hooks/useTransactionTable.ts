import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransacao, type Transacao } from "../Store/reducers/transactions";
import type { AppDispatch, RootReducer } from "../Store";

export const useTransactionTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootReducer) => state.transactions);

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
    console.log("abriu");
  };

  const fechaBusca = () => {
    if (isSearching) {
      setIsSearching(false);
      setValorBusca("");
      console.log("fechou");
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
    setValorBusca,
    fechaBusca,
    abreBusca,
    setIsDeleteModalOpen,
    setItemSelecionado,
    abrirDetalhes,
    fecharDetalhes,
  };
};

export type UseTableTransactionReturn = ReturnType<typeof useTransactionTable>;
