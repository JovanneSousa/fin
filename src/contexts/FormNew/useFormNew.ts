import { useContext } from "react";
import { FormNewContext } from "./FormNewContext";

export const useFormNew = () => {
  const context = useContext(FormNewContext);
  if (!context) {
    throw new Error("useFormNew deve ser usado com o provider");
  }
  return context;
};
