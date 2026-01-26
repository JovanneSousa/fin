import { useState } from "react";
import useCategory from "./useCategory";
import { usePaginacao } from "./usePaginacao";
import { useFormNew } from "../contexts/FormNew/useFormNew";

export const useCategoryTable = () => {
  const { categorias: items, buscaPorId, deletarCategoria, } = useCategory();

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
  const despesaPaginada = usePaginacao(items.despesa);
  const receitaPaginada = usePaginacao(items.receita);

  const categorias = { ...items, despesaPaginada, receitaPaginada };

  return {
    categorias,
    valorBusca,
    isSearching,
    abrirDetalhes,
    abreBusca,
    fechaBusca,
    setValorBusca,
    deletarCategoria,
  };
};

export type UseTableCategoryReturn = ReturnType<typeof useCategoryTable>;
