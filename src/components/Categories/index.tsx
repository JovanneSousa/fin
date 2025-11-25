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
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const { successPost, loadingPost, errorPost } = useSelector(
    (state: RootReducer) => state.categories
  );

  useEffect(() => {
    if (successPost) {
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successPost, dispatch]);

  useEffect(() => {
    if (errorPost) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorPost, dispatch]);

  return (
    <ContainerCat>
      <p className="new-title">Criar uma categoria</p>
      {successPost ? (
        <Feedback success={successPost} />
      ) : errorPost ? (
        <Feedback error={errorPost} />
      ) : loadingPost ? (
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
