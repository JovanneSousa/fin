import { useState } from "react";
import useCategory from "./useCategory";
import { usePaginacao } from "./usePaginacao";

export const useCategoryTable = () => {
  const { despesa, receita } = useCategory();

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
  const despesaPaginada = usePaginacao(despesa);
  const receitaPaginada = usePaginacao(receita);

  return {
    despesaPaginada,
    receitaPaginada,
    valorBusca,
    isSearching,
    abreBusca,
    fechaBusca,
    setValorBusca,
  };
};

export type UseTableCategoryReturn = ReturnType<typeof useCategoryTable>;
