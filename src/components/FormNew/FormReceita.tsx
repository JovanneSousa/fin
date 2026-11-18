import Button from "../Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { receitaSchema } from "../../validations/receitaSchema";
import { hoje } from "../../validations/baseTransacaoSchema";
import Formulario from "../Formulario";
import type { ChildrenFormProps } from ".";
import { StyledIconForm } from "../Formulario/styles";
import { faCalculator, faTags } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import useTransactions from "../../Hooks/useTransactions";
import { TransactionType } from "../../Utils/Enums/Transacao";
import { colors } from "../../styles/cores";
import type { CreateTransactionRequest } from "../../Store/reducers/transactions";

type ReceitaFormData = {
  description: string;
  amount: number;
  categoryId: string;
  transactionDate: string;
  isRecurring: boolean;
  type?: number;
};

const FormReceita = ({ size }: ChildrenFormProps) => {
  const {
    categorias: { receita },
    transacaoCreate: { criaTransacao },
  } = useTransactions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReceitaFormData>({
    resolver: yupResolver(receitaSchema),
    defaultValues: {
      transactionDate: hoje,
    },
  });

  const onSubmit = (data: ReceitaFormData) => {
    const payload: CreateTransactionRequest = {
      ...data,
      type: TransactionType.Renda,
    };
    criaTransacao(payload).then(() => reset());
  };

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
        <label htmlFor="cat-receita">Categoria</label>
        <select id="cat-receita" {...register("categoryId")}>
          <option value="">Selecione uma categoria</option>
          {receita.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <StyledIconForm size={size} icon={faTags} />
        <span>{errors.categoryId?.message}</span>
      </div>
      <div className="input-wrapper">
        <label htmlFor="transactionDate">Data</label>

        <input
          id="transactionDate"
          type="date"
          {...register("transactionDate")}
        />
        <span>{errors.transactionDate?.message}</span>
      </div>
      <div className="input-check">
        <input id="recurrency" type="checkbox" {...register("isRecurring")} />
        <label htmlFor="recurrency">Receita Recorrente</label>
        <span>{errors.isRecurring?.message}</span>
      </div>
      <Button
        padding="small"
        bgColor={colors.verde}
        type="submit"
        children="Adicionar Transação"
      />
    </Formulario>
  );
};

export default FormReceita;
