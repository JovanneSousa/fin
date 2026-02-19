import { NewSection } from "./styles";
import Loader from "../Loader";
import Feedback from "../Feedback";
import Button from "../Button";
import { colors } from "../../globalStyles";
import FormCategoria from "./FormCategoria";
import FormDespesa from "./FormDespesa";
import FormReceita from "./FormReceita";
import EditCategory from "./EditCategory";
import EditTransaction from "./EditTransaction";
import useTransactions from "../../Hooks/useTransactions";
import useCategory from "../../Hooks/useCategory";

interface FormNewProps {
  typeForm:
    | "receita"
    | "despesa"
    | "categoria"
    | "editCategoria"
    | "editTransacao";
  onClose: () => void;
}

export interface ChildrenFormProps {
  size: "small" | "default";
}

const FormNew = ({ typeForm, onClose }: FormNewProps) => {
  const tamanhoForm = "small";
  const Form = {
    categoria: <FormCategoria />,
    despesa: <FormDespesa size={tamanhoForm} />,
    receita: <FormReceita size={tamanhoForm} />,
    editCategoria: <EditCategory />,
    editTransacao: <EditTransaction onClose={onClose} />,
  };

  const { itemById, transacaoCreate, transacaoUpdate } = useTransactions();
  const { itemById: categoriaPorId, atualizaCategoria } = useCategory();

  const title = {
    receita: "Nova Receita",
    despesa: "Nova Despesa",
    categoria: "Nova Categoria",
    editCategoria: "Editar Categoria",
    editTransacao: "Editar Transação",
  };

  const statuses = [
    itemById,
    transacaoCreate,
    transacaoUpdate,
    categoriaPorId,
    atualizaCategoria,
  ];

  const isLoading = statuses.some((s) => s.status == "loading");
  const isError = statuses.some((s) => s.status == "failed");
  const errorMessage = statuses.find((s) => s.error)?.error;
  const isSuccess = [transacaoCreate, transacaoUpdate, atualizaCategoria].some(
    (s) => s.status == "succeeded",
  );
  const successMessage = [
    transacaoCreate,
    transacaoUpdate,
    atualizaCategoria,
  ].find((s) => s.success)?.success;

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

        {isError ? (
          <Feedback type="form" error={errorMessage} />
        ) : isSuccess ? (
          <Feedback type="form" success={successMessage!} />
        ) : (
          <>{isLoading && <Loader type="form" />}</>
        )}
        {Form[typeForm]}
      </div>
    </NewSection>
  );
};

export default FormNew;
