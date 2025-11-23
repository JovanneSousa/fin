import * as yup from "yup";

export const despesaSchema = yup.object().shape({
  titulo: yup
    .string()
    .required("Descrição é obrigatória")
    .min(3, "Descrição deve ter pelo menos 3 caracteres"),

  valor: yup
    .number()
    .typeError("Valor deve ser numérico")
    .positive("Valor deve ser maior que zero")
    .required("Valor é obrigatório"),

  categoriaId: yup.string().required("Categoria é obrigatória"),

  createdAt: yup
    .string()
    .required("Data obrigatória")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),

  isRecurring: yup.boolean().default(false),

  parcelas: yup
    .number()
    .typeError("O numero de parcelas deve ser numérico")
    .positive("O numero de parcelas deve ser positivo")
    .min(2, "O numero de parcelas deve ser no mínimo dois")
    .default(2)
    .required("Valor é obrigatório"),
});
