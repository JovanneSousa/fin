import { useSelector } from "react-redux";
import type { RootReducer } from "../Store";

const useCategory = () => {
  const { despesa, receita } = useSelector(
    (state: RootReducer) => state.categories
  );
  return { despesa, receita };
};

export default useCategory;
