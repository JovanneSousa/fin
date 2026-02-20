import { NewSection } from "./styles";
import Loader from "../Loader";
import Feedback, { type FeedbackMessageType } from "../Feedback";
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

type StateType = {
  state: {
    status: "failed" | "succeeded" | "loading" | "idle";
    error: string | null;
    success?: string | null;
  };
  typeMessage: FeedbackMessageType;
};

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

  const statusesWhitoutSuccess: StateType[] = [
    { state: itemById, typeMessage: { transactions: "fetch" } },
    { state: categoriaPorId, typeMessage: { transactions: "update" } },
  ];

  const statusesWhithSuccess: StateType[] = [
    { state: transacaoCreate, typeMessage: { transactions: "create" } },
    { state: transacaoUpdate, typeMessage: { transactions: "update" } },
    { state: atualizaCategoria, typeMessage: { categorys: "create" } },
  ];

  const statuses = [...statusesWhithSuccess, ...statusesWhitoutSuccess];

  // Erros
  const isError = statuses.some((s) => s.state.status == "failed");
  const errorStatus = statuses.find((s) => s.state.status == "failed");
  const errorMessage = statuses.find((s) => s.state.error)?.state.error;

  // Sucessos
  const isSuccess = statusesWhithSuccess.some(
    (s) => s.state.status == "succeeded",
  );
  const successStatus = statuses.find((s) => s.state.status == "succeeded");
  const successMessage = statusesWhithSuccess.find((s) => s.state.success)
    ?.state.success;

  // Loading
  const isLoading = statuses.some((s) => s.state.status == "loading");

  const tipoMensagem: FeedbackMessageType | undefined =
    errorStatus?.typeMessage ?? successStatus?.typeMessage;

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
          <Feedback
            typeMessage={tipoMensagem}
            type="form"
            error={errorMessage}
            className="teste"
          />
        ) : isSuccess ? (
          <Feedback type="form" success={successMessage!} />
        ) : (
          isLoading && <Loader type="form" />
        )}

        {Form[typeForm]}
      </div>
    </NewSection>
  );
};

export default FormNew;
