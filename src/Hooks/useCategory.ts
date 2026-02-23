import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootReducer } from "../Store";
import { useCallback, useMemo } from "react";
import {
  deleteCategories,
  getCategorieById,
  getCategories,
  getCores,
  getIcones,
  postCategories,
  updateCategoria,
  type Category,
} from "../Store/reducers/categories";
import type { CategoriaFormData } from "../validations/categoriaSchema";

const useCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, icone, cores, itemById, update, create } = useSelector(
    (state: RootReducer) => state.categories,
  );

  const hydrateItems = useCallback(
    (categoria: Category[]): Category[] => {
      const iconMap = new Map(icone.item.map((i) => [i.id, i]));
      const corMap = new Map(cores.item.map((c) => [c.id, c]));

      return categoria.map((c) => {
        if (c.icone && c.cor) return c;

        return {
          ...c,
          icone: c.icone ?? iconMap.get(c.iconId),
          cor: c.cor ?? corMap.get(c.corId),
        };
      });
    },
    [icone.item, cores.item],
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

  const categorias = {
    receita: useMemo(
      () => hydrateItems(items.receita),
      [items.receita, hydrateItems],
    ),
    despesa: useMemo(
      () => hydrateItems(items.despesa),
      [items.despesa, hydrateItems],
    ),
    status: items.status,
    error: items.error,
    buscaCategorias,
  };

  return {
    create,
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
