import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootReducer } from "../Store";
import { useCallback } from "react";
import {
  getCategorieById,
  getCategories,
  getCores,
  getIcones,
  postCategories,
} from "../Store/reducers/categories";
import type { CategoriaFormData } from "../validations/categoriaSchema";

const useCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { despesa, receita, status, icone, cores, itemById, update } =
    useSelector((state: RootReducer) => state.categories);

  const buscarIcones = useCallback(() => {
    dispatch(getIcones());
  }, [dispatch]);

  const buscarCores = useCallback(() => {
    dispatch(getCores());
  }, [dispatch]);

  const buscaCategorias = useCallback(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const buscaPorId = (id: string) => {
    dispatch(getCategorieById(id));
  };

  const criarCategoria = (data: CategoriaFormData) => {
    dispatch(postCategories(data));
  };

  return {
    itemById,
    despesa,
    receita,
    buscaCategorias,
    criarCategoria,
    buscaPorId,
    status,
    icone,
    buscarIcones,
    cores,
    buscarCores,
  };
};

export default useCategory;
