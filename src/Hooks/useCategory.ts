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

  const criarCategoria = async (data: CategoriaFormData) => {
    await dispatch(postCategories(data)).unwrap();
  };

  const atualizarCategoria = async (
    categoria: CategoriaFormData,
    id: string,
  ) => {
    await dispatch(updateCategoria({ categoria, id })).unwrap();
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
