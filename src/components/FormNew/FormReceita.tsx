import { colors } from "../../globalStyles";
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

type ReceitaFormData = {
  titulo: string;
  valor: number;
  categoriaId: string;
  dataMovimentacao: string;
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
      dataMovimentacao: hoje,
    },
  });

  const onSubmit = (data: ReceitaFormData) => {
    const payload = {
      ...data,
      type: 0,
    };
    criaTransacao(payload).then(() => reset());
  };

  return (
    <Formulario size="small" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <label htmlFor="descript">Descrição</label>
        <input id="descript" type="text" {...register("titulo")} />
        <StyledIconForm size={size} icon={faNewspaper} />
        <span>{errors.titulo?.message}</span>
      </div>
      <div className="input-wrapper">
        <label htmlFor="value">Valor</label>
        <input id="value" type="text" {...register("valor")} />
        <StyledIconForm size={size} icon={faCalculator} />
        <span>{errors.valor?.message}</span>
      </div>
      <div className="input-wrapper">
        <label htmlFor="cat-receita">Categoria</label>
        <select id="cat-receita" {...register("categoriaId")}>
          <option value="">Selecione uma categoria</option>
          {receita.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <StyledIconForm size={size} icon={faTags} />
        <span>{errors.categoriaId?.message}</span>
      </div>
      <div className="input-wrapper">
        <label htmlFor="dataMovimentacao">Data</label>

        <input
          id="dataMovimentacao"
          type="date"
          {...register("dataMovimentacao")}
        />
        <span>{errors.dataMovimentacao?.message}</span>
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
