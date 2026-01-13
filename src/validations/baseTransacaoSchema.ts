import * as yup from "yup";

export const hoje = new Date().toISOString().split("T")[0];

export const baseTransacaoSchema = yup.object({
  titulo: yup
    .string()
    .required("Descrição é obrigatória")
    .min(3, "Descrição deve ter pelo menos 3 caracteres"),

  valor: yup
    .number()
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        const normalizado = originalValue.replace(",", ".");
        return parseFloat(normalizado);
      }
      return value;
    })
    .typeError("Valor deve ser numérico")
    .positive("Valor deve ser maior que zero")
    .required("Valor é obrigatório"),

  categoriaId: yup.string().required("Categoria é obrigatória"),

  dataMovimentacao: yup
    .string()
    .required("Data obrigatória")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  isRecurring: yup.boolean().default(false),
});
