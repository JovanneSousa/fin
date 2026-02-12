import { useForm } from "react-hook-form";
import { colors } from "../../globalStyles";
import Button from "../Button";
import Formulario from "../Formulario";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "../../validations/baseAuthSchema";
import * as yup from "yup";
import useAuth from "../../Hooks/useAuth";

export type ForgotFormData = yup.InferType<typeof authSchema>;

const FormForgot = () => {
  const {
    register: loginInput,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(authSchema) });

  const { error, recoverToken } = useAuth();

  const onSubmit = (data: ForgotFormData) => {
    recoverToken(data).then(() => reset());
  };

  return (
    <Formulario onSubmit={handleSubmit(onSubmit)} size="default">
      <div className="input-wrapper">
        <input type="email" placeholder="Email" {...loginInput("email")} />
        <i className="fa fa-envelope" aria-hidden="true"></i>
        <span>{errors.email?.message}</span>
      </div>

      <Button
        padding="big"
        bgColor={colors.verde}
        children="Enviar"
        type="submit"
      />
      {error && <span className="error-message-span">{error}</span>}
    </Formulario>
  );
};

export default FormForgot;
