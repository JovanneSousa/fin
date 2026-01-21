import { NewSection } from "./styles";
import { useSelector } from "react-redux";
import type { RootReducer } from "../../Store";
import Loader from "../Loader";
import Feedback from "../Feedback";
import Button from "../Button";
import { colors } from "../../globalStyles";
import FormCategoria from "./FormCategoria";
import FormDespesa from "./FormDespesa";
import FormReceita from "./FormReceita";

interface FormNewProps {
  typeForm: "receita" | "despesa" | "categoria";
  onClose: () => void;
}

const FormNew = ({ typeForm, onClose }: FormNewProps) => {
  const Form = {
    categoria: <FormCategoria />,
    despesa: <FormDespesa />,
    receita: <FormReceita />,
  };

  const { loadingPost, errorPost, successPost } = useSelector(
    (state: RootReducer) => state.transactions
  );

  const title = {
    receita: "Nova Receita",
    despesa: "Nova Despesa",
    categoria: "Nova Categoria",
  };

  return (
    <NewSection>
      <div className="padding">
        <div className="flex">
          <p className="new-title">{title[typeForm]}</p>
          <Button
            onClick={onClose}
            bgColor={colors.defaultBackgroundColor}
            padding="small"
            type="button"
            icon="close"
          />
        </div>
        {loadingPost ? (
          <Loader />
        ) : errorPost ? (
          <Feedback error={errorPost} />
        ) : successPost ? (
          <Feedback success={successPost} />
        ) : (
          Form[typeForm]
        )}
      </div>
    </NewSection>
  );
};

export default FormNew;
