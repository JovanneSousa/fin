import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("O campo Email é obrigatório")
    .email("O campo Email está em formato inválido"),

  password: yup
    .string()
    .required("O campo Password é obrigatório")
    .min(6, "O campo Password precisa ter entre 6 e 100 caracteres")
    .max(100, "O campo Password precisa ter entre 6 e 100 caracteres")
});