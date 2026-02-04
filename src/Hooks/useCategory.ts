import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootReducer } from "../Store";
import { useCallback } from "react";
import {
  deleteCategories,
  getCategorieById,
  getCategories,
  getCores,
  getIcones,
  postCategories,
  updateCategoria,
} from "../Store/reducers/categories";
import type { CategoriaFormData } from "../validations/categoriaSchema";

const useCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, icone, cores, itemById, update } = useSelector(
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

  const buscaPorId = (id: string) => {
    dispatch(getCategorieById(id));
  };

  const criarCategoria = (data: CategoriaFormData) => {
    dispatch(postCategories(data));
  };

  const atualizarCategoria = (categoria: CategoriaFormData, id: string) => {
    dispatch(updateCategoria({ categoria, id }));
  };

  const deletarCategoria = (id: string) => {
    dispatch(deleteCategories(id));
  };

  const atualizaCategoria = { ...update, atualizarCategoria };

  const categorias = { ...items, buscaCategorias };

  return {
    categorias,
    atualizaCategoria,
    deletarCategoria,
    itemById,
    criarCategoria,
    buscaPorId,
    icone,
    buscarIcones,
    cores,
    buscarCores,
  };
};

export default useCategory;
