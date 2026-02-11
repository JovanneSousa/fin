import * as yup from "yup";
import { authSchema } from "./baseAuthSchema";

export const loginSchema = authSchema.shape({
  password: yup
    .string()
    .required("O campo Password é obrigatório")
    .min(6, "O campo Password precisa ter no minimo 6 caracteres")
    .max(100, "O campo Password precisa ter no máximo 100 caracteres"),
});
