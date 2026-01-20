import { colors } from "../../globalStyles";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootReducer } from "../../Store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { despesaSchema } from "../../validations/despesaSchema";
import { createTransaction } from "../../Store/reducers/transactions";
import { hoje } from "../../validations/baseTransacaoSchema";
import Formulario from "../Formulario";
import { faCalculator, faTags } from "@fortawesome/free-solid-svg-icons";
import { StyledIconForm } from "../Formulario/styles";
import type { ChildrenFormProps } from ".";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";

type DespesaFormData = {
  titulo: string;
  valor: number;
  categoriaId: string;
  dataMovimentacao: string;
  isRecurring: boolean;
  parcelas: number;
};

const FormDespesa = ({ size }: ChildrenFormProps) => {
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
    defaultValues: {
      dataMovimentacao: hoje,
    },
  });

  const onSubmit = (data: DespesaFormData) => {
    const payload = {
      ...data,
      dataMovimentacao: new Date(data.dataMovimentacao).toISOString(),
      type: 1,
      parcelas: data.isRecurring ? data.parcelas : undefined,
    };
    dispatch(createTransaction(payload));
    reset();
  };

  const isParcelado = watch("isRecurring");

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
        <label htmlFor="">Categoria</label>
        <select {...register("categoriaId")}>
          <option value="">Selecione uma categoria</option>
          {despesa.map((des) => (
            <option key={des.id} value={des.id}>
              {des.name}
            </option>
          ))}
        </select>
        <StyledIconForm size={size} icon={faTags} />
        <span>{errors.categoriaId?.message}</span>
      </div>
      <div className="input-wrapper">
        <label htmlFor="date">Data</label>
        <input id="date" type="date" {...register("dataMovimentacao")} />
        <span>{errors.dataMovimentacao?.message}</span>
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
      <Button
        padding="small"
        bgColor={colors.verde}
        type="submit"
        children="Adicionar Transação"
      />
    </Formulario>
  );
};

export default FormDespesa;
