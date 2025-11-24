import * as yup from "yup";

export const receitaSchema = yup.object().shape({
  titulo: yup
    .string()
    .required("Descrição é obrigatória")
    .min(3, "Descrição deve ter pelo menos 3 caracteres"),

  valor: yup
    .number()
    .typeError("Valor deve ser numérico")
    .positive("Valor deve ser maior que zero")
    .required("Valor é obrigatório"),

  categoriaId: yup
    .string()
    .required("Categoria é obrigatória")
    .default(new Date().toISOString().split("T")[0]),

  createdAt: yup
    .string()
    .required("Data obrigatória")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),

  isRecurring: yup.boolean().default(false),
});
