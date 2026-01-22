import { createContext } from "react";

export type ModalTypes =
  | "receita"
  | "despesa"
  | "categoria"
  | "editCategoria"
  | "editTransacao"
  | null;

export type FormNewContextType = {
  isOpenModal: ModalTypes;
  abreModal: (modal: ModalTypes) => void;
  fechaModal: () => void;
};

export const FormNewContext = createContext<FormNewContextType | null>(null);
