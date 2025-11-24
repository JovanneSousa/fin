import * as yup from "yup";
import { baseTransacaoSchema } from "./baseTransacaoSchema";

export const despesaSchema = baseTransacaoSchema.shape({
  parcelas: yup
    .number()
    .typeError("O número de parcelas deve ser numérico")
    .positive("O número de parcelas deve ser positivo")
    .min(2, "O número de parcelas deve ser no mínimo dois")
    .default(2)
    .required("Valor é obrigatório"),
});
