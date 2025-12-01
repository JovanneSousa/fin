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
import Button from "../Button";
import { colors } from "../../globalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
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
      <div className="padding">
        <div className="flex">
          <p className="new-title">Criar uma categoria</p>
          <Button
            bgColor={colors.transparent}
            padding="small"
            type="button"
            children={<FontAwesomeIcon icon={faChevronDown} />}
            onClick={() => {
              setIsFormActive(!isFormActive);
              console.log(isFormActive);
            }}
          />
        </div>
        <div className={`content ${isFormActive ? "is-active" : ""}`}>
          {successPost ? (
            <Feedback success={successPost} />
          ) : errorPost ? (
            <Feedback error={errorPost} />
          ) : loadingPost ? (
            <Loader />
          ) : (
            <FormCategoria onListarCategorias={() => setIsOpen(true)} />
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <CategorieList onClose={() => setIsOpen(false)} />
      </Modal>
    </ContainerCat>
  );
};

export default Categories;
