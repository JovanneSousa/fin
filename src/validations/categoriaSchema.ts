import * as yup from "yup";

export const categoriaSchema = yup.object({
  name: yup
    .string()
    .required("O campo Nome da Categoria é obrigatório")
    .min(3, "O nome da categoria deve ter no mínimo 3 caracteres")
    .max(50, "O nome da categoria deve ter no máximo 50 caracteres"),

  type: yup
    .number()
    .required("O campo Tipo é obrigatório")
    .oneOf([0, 1], "Tipo inválido: use 0 para Despesa ou 1 para Receita"),
});