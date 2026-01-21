import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootReducer } from "../Store";
import { useCallback } from "react";
import { getCategories, getIcones } from "../Store/reducers/categories";

const useCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { despesa, receita, status, icone } = useSelector(
    (state: RootReducer) => state.categories,
  );

  const buscarIcones = useCallback(() => {
    dispatch(getIcones());
  }, [dispatch]);

  const buscaCategorias = useCallback(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return { despesa, receita, buscaCategorias, status, icone, buscarIcones };
};

export default useCategory;
