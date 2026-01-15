import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootReducer } from "../Store";
import { useEffect } from "react";
import { getCategories } from "../Store/reducers/categories";

const useCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { despesa, receita } = useSelector(
    (state: RootReducer) => state.categories
  );

  useEffect(() => {
    if (!receita.length && !despesa.length) dispatch(getCategories());
  }, [dispatch, receita.length, despesa.length]);
  return { despesa, receita };
};

export default useCategory;
