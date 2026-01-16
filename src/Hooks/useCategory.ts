import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootReducer } from "../Store";
import { useCallback } from "react";
import { getCategories } from "../Store/reducers/categories";

const useCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { despesa, receita } = useSelector(
    (state: RootReducer) => state.categories
  );

  const buscaCategorias = useCallback(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return { despesa, receita, buscaCategorias };
};

export default useCategory;
