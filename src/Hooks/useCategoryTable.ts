import { useState } from "react";
import useCategory from "./useCategory";
import { usePaginacao } from "./usePaginacao";
import { useFormNew } from "../contexts/FormNew/useFormNew";

export const useCategoryTable = () => {
  const { despesa, receita, buscaPorId } = useCategory();

  const { abreModal } = useFormNew();

  const [isSearching, setIsSearching] = useState(false);
  const [valorBusca, setValorBusca] = useState("");

  const abreBusca = () => {
    setIsSearching(true);
  };

  const abrirDetalhes = (id: string) => {
    buscaPorId(id);
    abreModal("editCategoria");
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
    abrirDetalhes,
    abreBusca,
    fechaBusca,
    setValorBusca,
  };
};

export type UseTableCategoryReturn = ReturnType<typeof useCategoryTable>;
