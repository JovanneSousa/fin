import { useSelector } from "react-redux";
import type { RootReducer } from "../Store";
import { useState } from "react";

export const useCategoryTable = () => {
  const { despesa, receita } = useSelector(
    (state: RootReducer) => state.categories
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

  return {
    despesa,
    receita,
    valorBusca,
    isSearching,
    abreBusca,
    fechaBusca,
    setValorBusca
  };
};

export type UseTableCategoryReturn = ReturnType<typeof useCategoryTable>;
