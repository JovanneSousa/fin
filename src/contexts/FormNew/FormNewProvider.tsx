import { useState, type ReactNode } from "react";
import { FormNewContext, type ModalTypes } from "./FormNewContext";

type Props = {
  children: ReactNode;
};

const FormNewProvider = ({ children }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<ModalTypes>(null);

  const abreModal = (modal: ModalTypes) => setIsOpenModal(modal);
  const fechaModal = () => setIsOpenModal(null);

  return (
    <FormNewContext.Provider value={{ isOpenModal, abreModal, fechaModal }}>
      {children}
    </FormNewContext.Provider>
  );
};

export default FormNewProvider;
