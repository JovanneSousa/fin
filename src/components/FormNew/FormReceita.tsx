import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../globalStyles";
import Button from "../Button";
import { type AppDispatch, type RootReducer } from "../../Store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTransaction } from "../../Store/reducers/transactions";
import { receitaSchema } from "../../validations/receitaSchema";
import { useEffect } from "react";
import { hoje } from "../../validations/baseTransacaoSchema";

type ReceitaFormData = {
  titulo: string;
  valor: number;
  categoriaId: string;
  dataMovimentacao: string;
  isRecurring: boolean;
  type?: number;
};

const FormReceita = () => {
  const { receita } = useSelector((state: RootReducer) => state.categories);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReceitaFormData>({
    resolver: yupResolver(receitaSchema),
    defaultValues: {
      dataMovimentacao: hoje
    },
  });

  const onSubmit = (data: ReceitaFormData) => {
    const payload = {
      ...data,
      dataMovimentacao: new Date(data.dataMovimentacao).toISOString(),
      type: 0,
    };
    dispatch(createTransaction(payload));
    reset();
  };

  useEffect(() => {
    console.log({ ...register("dataMovimentacao") });
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <label htmlFor="descript">Descrição</label>
        <input id="descript" type="text" {...register("titulo")} />
        <span>{errors.titulo?.message}</span>
      </div>
      <div className="input-wrapper">
        <label htmlFor="value">Valor</label>
        <input id="value" type="text" {...register("valor")} />
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
    </form>
  );
};

export default FormReceita;
