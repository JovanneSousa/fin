import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("O campo Email é obrigatório")
    .email("O campo Email está em formato inválido"),

  password: yup
    .string()
    .required("O campo Password é obrigatório")
});