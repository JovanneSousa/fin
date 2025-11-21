import { useState } from "react";
import FormCategoria from "../FormCategoria";
import Modal from "../ModalContainer";
import { ContainerCat } from "./styles";
import CategorieList from "../CategoriesList";

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContainerCat>
      <FormCategoria onListarCategorias={() => setIsOpen(true)} />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <CategorieList onClose={() => setIsOpen(false)} />
      </Modal>
    </ContainerCat>
  );
};

export default Categories;
