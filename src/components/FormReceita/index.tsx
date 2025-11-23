import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../globalStyles";
import Button from "../Button";
import { type AppDispatch, type RootReducer } from "../../Store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { receitaSchema } from "../../validations/receitaScheme";
import { createTransaction } from "../../Store/reducers/transactions";

type ReceitaFormData = {
  titulo: string;
  valor: number;
  categoriaId: string;
  createdAt: string;
  isRecurring: boolean;
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
  });

  const onSubmit = (data: ReceitaFormData) => {
    const payload = {
      ...data,
      createdAt: new Date(data.createdAt).toISOString(),
      type: 0,
    };
    dispatch(createTransaction(payload));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <label htmlFor="descript">Descrição</label>
        <input id="descript" type="text" {...register("titulo")} />
      </div>
      <div className="input-wrapper">
        <label htmlFor="value">Valor</label>
        <input id="value" type="number" {...register("valor")} />
      </div>
      <div className="input-wrapper">
        <label htmlFor="cat-receita">Categoria</label>
        <select id="cat-receita" {...register("categoriaId")}>
          <option>Selecione uma categoria</option>
          {receita.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="input-wrapper">
        <label htmlFor="createdAt">Data</label>
        <input id="createdAt" type="date" {...register("createdAt")} />
      </div>
      <div className="input-check">
        <input id="recurrency" type="checkbox" {...register("isRecurring")} />
        <label htmlFor="recurrency">Receita Recorrente</label>
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
