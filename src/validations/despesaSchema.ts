import * as yup from "yup";
import { baseTransacaoSchema } from "./baseTransacaoSchema";

export const despesaSchema = baseTransacaoSchema.shape({
  parcelas: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .optional()
    .typeError("O número de parcelas deve ser numérico")
    .when("isRecurring", {
      is: true,
      then: (schema) =>
        schema
          .required("Valor é obrigatório")
          .positive("O número de parcelas deve ser positivo")
          .min(2, "O número de parcelas deve ser no mínimo dois"),
      otherwise: (schema) => schema.optional(),
    }),
});

export type DespesaFormData = yup.InferType<typeof despesaSchema>;
