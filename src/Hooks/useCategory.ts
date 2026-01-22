import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootReducer } from "../Store";
import { useCallback } from "react";
import {
  getCategories,
  getCores,
  getIcones,
} from "../Store/reducers/categories";

const useCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { despesa, receita, status, icone, cores } = useSelector(
    (state: RootReducer) => state.categories,
  );

  const buscarIcones = useCallback(() => {
    dispatch(getIcones());
  }, [dispatch]);

  const buscarCores = useCallback(() => {
    dispatch(getCores());
  }, [dispatch]);

  const buscaCategorias = useCallback(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return {
    despesa,
    receita,
    buscaCategorias,
    status,
    icone,
    buscarIcones,
    cores,
    buscarCores,
  };
};

export default useCategory;
