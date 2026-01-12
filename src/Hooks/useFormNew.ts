import { useState } from "react";

export type ModalTypes = "despesa" | "receita" | "categoria" | null;
const useFormNew = () => {
  const [isOpenModal, setIsOpenModal] = useState<ModalTypes>(null);

  const abreModal = (modal: ModalTypes) => {
    setIsOpenModal(modal);
  };

  const fechaModal = () => {
    setIsOpenModal(null);
  };
  return {
    isOpenModal,
    abreModal,
    fechaModal,
  };
};

export default useFormNew;
