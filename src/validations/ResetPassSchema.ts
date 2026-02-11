import { authSchema } from "./baseAuthSchema";
import * as yup from "yup";

export const ResetPassSchema = authSchema.shape({
  password: yup
    .string()
    .required("O campo Password é obrigatório")
    .min(6, "O campo Password precisa ter entre 6 e 100 caracteres")
    .max(100, "O campo senha precisa ter entre 6 e 100 caracteres")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .matches(/[0-9]/, "A senha deve conter pelo menos um número")
    .matches(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um símbolo"),

  confirmPassword: yup
    .string()
    .required("O campo confirme a senha é obrigatório")
    .oneOf([yup.ref("password")], "As senhas não conferem"),
});
