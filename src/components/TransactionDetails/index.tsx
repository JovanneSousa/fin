import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../globalStyles";
import Button from "../Button";
import { ContainerDetails } from "./styles";
import { type AppDispatch, type RootReducer } from "../../Store";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import Feedback from "../Feedback";
import { receitaSchema } from "../../validations/receitaSchema";
import { despesaSchema } from "../../validations/despesaSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { updateTransaction } from "../../Store/reducers/transactions";

interface TransacaoDetailsProps {
  onClose: () => void;
}

type EditFormTransacao = {
  titulo: string;
  valor: number;
  categoriaId: string;
  dataMovimentacao: string;
  isRecurring: boolean;
  parcelas?: number;
};

const TransacaoDetails: React.FC<TransacaoDetailsProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    selected,
    loadingGetItem,
    errorGetItem,
    loadingUpdate,
    errorUpdate,
    successUpdate,
  } = useSelector((state: RootReducer) => state.transactions);

  const { despesa, receita } = useSelector(
    (state: RootReducer) => state.categories
  );
  const [isEditing, setIsEditing] = useState(false);

  const schema = selected?.type === 0 ? receitaSchema : despesaSchema;

  const { register, handleSubmit, reset, watch } = useForm<EditFormTransacao>({
    resolver: yupResolver(schema),
    defaultValues: selected!,
  });

  const onSubmit = (data: EditFormTransacao) => {
    const payload = {
      ...data,
      id: selected?.id,
    };
    dispatch(updateTransaction(payload));
    reset();
    setIsEditing(false);
  };

  const isParcelado = watch("isRecurring");

  useEffect(() => {
    if (selected) {
      reset({
        titulo: selected.titulo,
        valor: selected.valor,
        categoriaId: selected.categoriaId,
        dataMovimentacao: selected.dataMovimentacao.split("T")[0],
        isRecurring: selected.isRecurring,
        parcelas: selected.parcelas ?? undefined,
      });
    }
  }, [selected, reset]);

  return (
    <ContainerDetails>
      <p>{isEditing ? "Editando Transação" : "Detalhes da Transação"}</p>
      {loadingGetItem || loadingUpdate ? (
        <Loader />
      ) : errorGetItem ? (
        <Feedback error={errorGetItem} />
      ) : errorUpdate ? (
        <Feedback error={errorUpdate} />
      ) : successUpdate ? (
        <Feedback success={successUpdate} />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={isEditing ? "is-editing" : ""}
        >
          <div className="input-wrapper">
            <label htmlFor="edit-descript">Descrição</label>

            {isEditing ? (
              <input id="descript" type="text" {...register("titulo")} />
            ) : (
              <span className="input-span">{selected?.titulo}</span>
            )}

            {/* <span>{errors.titulo?.message}</span> */}
          </div>
          <div className="input-wrapper">
            <label htmlFor="edit-value">Valor</label>
            <input
              id="edit-value"
              type="number"
              {...register("valor")}
              disabled={!isEditing}
            />
            {/* <span>{errors.valor?.message}</span> */}
          </div>
          <div className="input-wrapper">
            <label htmlFor="edit-cat-receita">Categoria</label>
            <select
              disabled={!isEditing}
              id="edit-cat-receita"
              {...register("categoriaId")}
            >
              <option value={selected?.categoria?.id}>
                {selected?.categoria?.name}
              </option>
              {selected?.type === 0
                ? receita.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))
                : despesa.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
            </select>
            {/* <span>{errors.categoriaId?.message}</span> */}
          </div>
          <div className="input-wrapper">
            <label htmlFor="edit-dataMovimentacao">Data</label>
            <input
              disabled={!isEditing}
              id="edit-dataMovimentacao"
              type="date"
              {...register("dataMovimentacao")}
            />
            {/* <span>{errors.dataMovimentacao?.message}</span> */}
          </div>

          {selected?.type === 0 ? (
            <div className="input-check">
              <input
                disabled={!isEditing}
                id="edit-recurrency"
                type="checkbox"
                {...register("isRecurring")}
              />
              <label htmlFor="edit-recurrency">Receita Recorrente</label>
              {/* <span>{errors.isRecurring?.message}</span> */}
            </div>
          ) : (
            <div className="container-check">
              <div className="input-check">
                <input
                  id="edit-recurrency"
                  type="checkbox"
                  {...register("isRecurring")}
                  disabled={!isEditing}
                />
                <label htmlFor="edit-recurrency">Despesa Parcelada</label>
                {/* <span>{errors.isRecurring?.message}</span> */}
              </div>
              {isParcelado && (
                <div className="parcelas">
                  <label htmlFor="edit-parc">Quantidade de parcelas</label>
                  <input
                    type="number"
                    id="edit-parc"
                    {...register("parcelas")}
                    disabled={!isEditing}
                  />
                  {/* <span>{errors.parcelas?.message}</span> */}
                </div>
              )}
            </div>
          )}
          <div className="button-container">
            <Button
              padding="small"
              bgColor={isEditing ? colors.vermelho : colors.azul}
              type="button"
              children={isEditing ? "Cancelar" : "Voltar"}
              onClick={isEditing ? () => setIsEditing(false) : onClose}
            />
            {isEditing ? (
              <Button
                padding="small"
                bgColor={colors.verde}
                type="submit"
                children="Salvar"
              />
            ) : null}
            {!isEditing ? (
              <Button
                padding="small"
                bgColor={colors.laranja}
                children="Editar"
                type="button"
                onClick={() => setIsEditing(true)}
              />
            ) : null}
          </div>
        </form>
      )}
    </ContainerDetails>
  );
};

export default TransacaoDetails;
