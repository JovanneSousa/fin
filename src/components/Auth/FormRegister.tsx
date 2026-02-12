import Button from "../Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validations/registerSchema";
import * as yup from "yup";
import { colors } from "../../globalStyles";
import Formulario from "../Formulario";
import useAuth from "../../Hooks/useAuth";

export type RegisterFormData = yup.InferType<typeof registerSchema>;

const FormRegister = () => {
  const { error, loading, registrar } = useAuth();

  const {
    register: registerInput,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    await registrar(data);
    reset();
  };

  return (
    <Formulario size="default" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <input type="text" placeholder="Nome" {...registerInput("nome")} />
        <i className="fa fa-user"></i>
        <span className="error-span">{errors.nome?.message}</span>
      </div>
      <div className="input-wrapper">
        <input type="email" placeholder="Email" {...registerInput("email")} />
        <i className="fa fa-envelope" aria-hidden="true"></i>
        <span>{errors.email?.message}</span>
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          placeholder="Senha"
          {...registerInput("password")}
        />
        <i className="fa fa-lock" aria-hidden="true"></i>
        <span>{errors.password?.message}</span>
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          placeholder="Confirme a senha"
          {...registerInput("confirmPassword")}
        />
        <i className="fa fa-lock" aria-hidden="true"></i>
        <span className="error-span">{errors.confirmPassword?.message}</span>
      </div>

      <Button padding="big" bgColor={colors.verde} type="submit">
        {loading ? "Cadastrando..." : "Cadastrar"}
      </Button>
      {error && <span className="error-message-span">{error}</span>}
    </Formulario>
  );
};

export default FormRegister;
