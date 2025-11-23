import { colors } from "../../globalStyles";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootReducer } from "../../Store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { despesaSchema } from "../../validations/despesaSchema";
import { createTransaction } from "../../Store/reducers/transactions";

type DespesaFormData = {
  titulo: string;
  valor: number;
  categoriaId: string;
  createdAt: string;
  isRecurring: boolean;
  parcelas: number;
};

const FormDespesa = () => {
  const { despesa } = useSelector((state: RootReducer) => state.categories);

  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<DespesaFormData>({
    resolver: yupResolver(despesaSchema),
  });

  const onSubmit = (data: DespesaFormData) => {
    const payload = {
      ...data,
      createdAt: new Date(data.createdAt).toISOString(),
      type: 1,
      parcelas: data.isRecurring ? data.parcelas : null,
    };
    dispatch(createTransaction(payload));
    reset();
  };

  const isParcelado = watch("isRecurring");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <label htmlFor="descript">Descrição</label>
        <input id="descript" type="text" {...register("titulo")} />
        <span>{errors.titulo?.message}</span>
      </div>
      <div className="input-wrapper">
        <label htmlFor="value">Valor</label>
        <input id="value" type="number" {...register("valor")} />
        <span>{errors.valor?.message}</span>
      </div>
      <div className="input-wrapper">
        <label htmlFor="">Categoria</label>
        <select {...register("categoriaId")}>
          <option>Selecione uma categoria</option>
          {despesa.map((des) => (
            <option key={des.id} value={des.id}>
              {des.name}
            </option>
          ))}
        </select>
        <span>{errors.categoriaId?.message}</span>
      </div>
      <div className="input-wrapper">
        <label htmlFor="date">Data</label>
        <input id="date" type="date" {...register("createdAt")} />
        <span>{errors.createdAt?.message}</span>
      </div>
      <div className="container-check">
        <div className="input-check">
          <input id="recurrency" type="checkbox" {...register("isRecurring")} />
          <label htmlFor="recurrency">Despesa Parcelada</label>
          <span>{errors.isRecurring?.message}</span>
        </div>
        {isParcelado && (
          <div className="parcelas">
            <label htmlFor="parc">Quantidade de parcelas</label>
            <input type="number" id="parc" {...register("parcelas")} />
            <span>{errors.parcelas?.message}</span>
          </div>
        )}
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

export default FormDespesa;
