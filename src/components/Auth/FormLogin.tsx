import Button from "../Button";
import "font-awesome/css/font-awesome.min.css";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../validations/loginSchema";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { colors } from "../../globalStyles";
import Formulario from "../Formulario";
import type { PageType } from ".";
import useAuth from "../../Hooks/useAuth";

export type LoginFormData = yup.InferType<typeof loginSchema>;

export interface FormAuthProps {
  handleForgot: (value: PageType) => void;
}

const FormLogin = ({ handleForgot }: FormAuthProps) => {

  const { error, logar, loginTeste } = useAuth();

  const {
    register: loginInput,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await logar(data);
    reset();
  };

  return (
    <>
      <Formulario size="default" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <input type="email" placeholder="Email" {...loginInput("email")} />
          <i className="fa fa-envelope" aria-hidden="true"></i>
          <span>{errors.email?.message}</span>
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Senha"
            {...loginInput("password")}
          />
          <i className="fa fa-lock" aria-hidden="true"></i>
          <span>{errors.password?.message}</span>
        </div>
        <Button
          padding="big"
          bgColor={colors.verde}
          children="LOGIN"
          type="submit"
        />
        {error && <span className="error-message-span">{error}</span>}
        <a onClick={() => handleForgot("Forgot")}>esqueci a senha</a>
      </Formulario>
      <Button
        className="login-visit"
        bgColor={colors.verde}
        padding="small"
        children="Logar como visitante"
        type="button"
        onClick={loginTeste}
      />
    </>
  );
};

export default FormLogin;
