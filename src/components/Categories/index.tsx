import { useEffect, useState } from "react";
import FormCategoria from "../FormCategoria";
import Modal from "../ModalContainer";
import { ContainerCat } from "./styles";
import CategorieList from "../CategoriesList";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootReducer } from "../../Store";
import Loader from "../Loader";
import Feedback from "../Feedback";
import { clearError, clearSuccess } from "../../Store/reducers/categories";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isOpen, setIsOpen] = useState(false);
  const { success, loading, error } = useSelector(
    (state: RootReducer) => state.categories
  );

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <ContainerCat>
      {success ? (
        <Feedback success={success} />
      ) : error ? (
        <Feedback error={error} />
      ) : loading ? (
        <Loader />
      ) : (
        <FormCategoria onListarCategorias={() => setIsOpen(true)} />
      )}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <CategorieList onClose={() => setIsOpen(false)} />
      </Modal>
    </ContainerCat>
  );
};

export default Categories;
