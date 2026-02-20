import { colors } from "../../globalStyles";
import Button from "../Button";
import { useEffect, useState } from "react";
import { receitaSchema } from "../../validations/receitaSchema";
import { despesaSchema } from "../../validations/despesaSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Formulario from "../Formulario";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { StyledIconForm } from "../Formulario/styles";
import { faCalculator, faTags } from "@fortawesome/free-solid-svg-icons";
import useTransactions from "../../Hooks/useTransactions";

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

const EditTransaction = ({ onClose }: TransacaoDetailsProps) => {
  const {
    itemById,
    transacaoUpdate,
    categorias: { receita, despesa },
  } = useTransactions();
  const [isEditing, setIsEditing] = useState(false);

  const selected = itemById.item;

  const schema = selected?.type === 0 ? receitaSchema : despesaSchema;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EditFormTransacao>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: EditFormTransacao) => {
    const payload = {
      ...data,
      id: selected?.id,
    };
    transacaoUpdate.atualizarTransacao(payload).then(() => reset());
    setIsEditing(false);
  };

  const isParcelado = watch("isRecurring");

  useEffect(() => {
    if (selected) {
      reset({
        titulo: selected.titulo,
        valor: selected.valor,
        categoriaId: selected.categoriaId,
        dataMovimentacao: selected.dataMovimentacao.split("T")[0] ?? "",
        isRecurring: selected.isRecurring,
        parcelas: selected.parcelas ?? undefined,
      });
    }
  }, [selected, reset]);

  return (
    <>
      <Formulario
        size="small"
        onSubmit={handleSubmit(onSubmit)}
        className={isEditing ? "is-editing" : ""}
      >
        <div className="input-wrapper">
          <label htmlFor="edit-descript">Descrição</label>

          {isEditing ? (
            <input id="descript" type="text" {...register("titulo")} />
          ) : (
            <div className="input-span">{selected?.titulo}</div>
          )}
          <StyledIconForm size="small" icon={faNewspaper} />
          <span>{errors.titulo?.message}</span>
        </div>
        <div className="input-wrapper">
          <label htmlFor="edit-value">Valor</label>
          <input
            id="edit-value"
            type="text"
            {...register("valor")}
            disabled={!isEditing}
          />
          <StyledIconForm size="small" icon={faCalculator} />
          <span>{errors.valor?.message}</span>
        </div>
        <div className="input-wrapper">
          <label htmlFor="edit-cat-receita">Categoria</label>
          <select
            disabled={!isEditing}
            id="edit-cat-receita"
            {...register("categoriaId")}
          >
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
          <StyledIconForm size="small" icon={faTags} />
          <span>{errors.categoriaId?.message}</span>
        </div>
        <div className="input-wrapper">
          <label htmlFor="edit-dataMovimentacao">Data</label>
          <input
            disabled={!isEditing}
            id="edit-dataMovimentacao"
            type="date"
            {...register("dataMovimentacao")}
          />
          <span>{errors.dataMovimentacao?.message}</span>
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
            <span>{errors.isRecurring?.message}</span>
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
              <span>{errors.isRecurring?.message}</span>
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
                <span>{errors.parcelas?.message}</span>
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
      </Formulario>
    </>
  );
};

export default EditTransaction;
