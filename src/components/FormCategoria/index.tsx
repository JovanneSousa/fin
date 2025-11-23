import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { colors } from "../../globalStyles";
import Button from "../Button";
import { postCategories } from "../../Store/reducers/categories";
import { type AppDispatch } from "../../Store";
import { categoriaSchema } from "../../validations/categoriaSchema";

interface FormCategoriaProps {
  onListarCategorias?: () => void;
}

type CategoriaFormData = {
  name: string;
  type: number;
};

const FormCategoria: React.FC<FormCategoriaProps> = ({ onListarCategorias }) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoriaFormData>({
    resolver: yupResolver(categoriaSchema),
  });

  const onSubmit = (data: CategoriaFormData) => {
    dispatch(postCategories(data));
    reset(); 
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <label htmlFor="categoria-desp">Tipo</label>
          <select id="categoria-desp" {...register("type")}>
            <option value={1}>Receita</option>
            <option value={0}>Despesa</option>
          </select>
          <span>{errors.type?.message}</span>
        </div>

        <div className="input-wrapper">
          <label htmlFor="cat-name">Nome da Categoria</label>
          <input id="cat-name" type="text" {...register("name")} />
          <span>{errors.name?.message}</span>
        </div>

        <Button
          padding="small"
          bgColor={colors.verde}
          type="submit"
          children="Adicionar Categoria"
        />
      </form>

      <Button
        type="button"
        bgColor={colors.azul}
        padding="small"
        children="Listar Categorias"
        onClick={onListarCategorias}
      />
    </>
  );
};

export default FormCategoria;
