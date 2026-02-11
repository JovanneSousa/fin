import * as yup from "yup";

export const authSchema = yup.object({
  email: yup
    .string()
    .required("O campo Email é obrigatório")
    .email("O campo Email está em formato inválido"),
});