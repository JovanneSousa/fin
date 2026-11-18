import Button from "../Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  despesaSchema,
  type DespesaFormData,
} from "../../validations/despesaSchema";
import { hoje } from "../../validations/baseTransacaoSchema";
import Formulario from "../Formulario";
import { faCalculator, faTags } from "@fortawesome/free-solid-svg-icons";
import { StyledIconForm } from "../Formulario/styles";
import type { ChildrenFormProps } from ".";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import useTransactions from "../../Hooks/useTransactions";
import { TransactionType } from "../../Utils/Enums/Transacao";
import { colors } from "../../styles/cores";
import type { CreateTransactionRequest } from "../../Store/reducers/transactions";

const FormDespesa = ({ size }: ChildrenFormProps) => {
  const {
    categorias: { despesa },
    transacaoCreate: { criaTransacao },
  } = useTransactions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(despesaSchema),
    defaultValues: {
      transactionDate: hoje,
    },
  });

  const onSubmit = (data: DespesaFormData) => {
    const payload: CreateTransactionRequest = {
      ...data,
      type: TransactionType.Despesa,
      parcelas: data.isRecurring ? data.parcelas : undefined,
    };
    criaTransacao(payload).then(() => reset());
  };

  const isParcelado = watch("isRecurring");

  return (
    <Formulario size="small" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <label htmlFor="descript">Descrição</label>
        <input id="descript" type="text" {...register("description")} />
        <StyledIconForm size={size} icon={faNewspaper} />
        <span>{errors.description?.message}</span>
      </div>
      <div className="input-wrapper">
        <label htmlFor="value">Valor</label>
        <input id="value" type="text" {...register("amount")} />
        <StyledIconForm size={size} icon={faCalculator} />
        <span>{errors.amount?.message}</span>
      </div>
      <div className="input-wrapper">
        <label htmlFor="">Categoria</label>
        <select {...register("categoryId")}>
          <option value="">Selecione uma categoria</option>
          {despesa.map((des) => (
            <option key={des.id} value={des.id}>
              {des.name}
            </option>
          ))}
        </select>
        <StyledIconForm size={size} icon={faTags} />
        <span>{errors.categoryId?.message}</span>
      </div>
      <div className="input-wrapper">
        <label htmlFor="date">Data</label>
        <input id="date" type="date" {...register("transactionDate")} />
        <span>{errors.transactionDate?.message}</span>
      </div>
      <div className={`container-check ${isParcelado ? "open" : ""}`}>
        <div className="input-check">
          <input id="recurrency" type="checkbox" {...register("isRecurring")} />
          <label htmlFor="recurrency">Despesa Parcelada</label>
          <span>{errors.isRecurring?.message}</span>
        </div>
        <div className={`parcelas ${isParcelado ? "open" : ""}`}>
          <label htmlFor="parc">Quantidade de parcelas</label>
          <input type="number" id="parc" {...register("parcelas")} />
          <span>{errors.parcelas?.message}</span>
        </div>
      </div>
      <Button padding="small" bgColor={colors.verde} type="submit">
        Adicionar Transação
      </Button>
    </Formulario>
  );
};

export default FormDespesa;
