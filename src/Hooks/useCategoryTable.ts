import { useState } from "react";
import useCategory from "./useCategory";
import { usePaginacao } from "./usePaginacao";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../Store";
import { useFormNew } from "../contexts/FormNew/useFormNew";
import { getCategories } from "../Store/reducers/categories";

export const useCategoryTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { despesa, receita } = useCategory();

  const { abreModal } = useFormNew();

  const [isSearching, setIsSearching] = useState(false);
  const [valorBusca, setValorBusca] = useState("");

  const abreBusca = () => {
    setIsSearching(true);
  };

  const abrirDetalhes = (id: string) => {
    dispatch(getCategories());
    abreModal("editCategoria");
    console.log(id);
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
