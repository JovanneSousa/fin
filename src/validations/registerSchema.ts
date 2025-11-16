import * as yup from "yup";

export const registerSchema = yup.object({
  nome: yup
    .string()
    .required("O campo Nome é obrigatório")
    .min(2, "O campo Nome deve ter entre 2 e 50 caracteres")
    .max(50, "O campo Nome deve ter entre 2 e 50 caracteres"),

  email: yup
    .string()
    .required("O campo Email é obrigatório")
    .email("O campo Email está em formato inválido"),

  password: yup
    .string()
    .required("O campo Password é obrigatório")
    .min(6, "O campo Password precisa ter entre 6 e 100 caracteres")
    .max(100, "O campo Password precisa ter entre 6 e 100 caracteres"),

  confirmPassword: yup
    .string()
    .required("O campo ConfirmPassword é obrigatório")
    .oneOf([yup.ref("password")], "As senhas não conferem"),
});