import { useForm } from "react-hook-form";
import type { AuthPageProps } from ".";
import Formulario from "../Formulario";
import useAuth from "../../Hooks/useAuth";

const FormReset = ({ resetPassData }: AuthPageProps) => {
  const {
    register: registerInput,
    formState: { errors },
  } = useForm();
  const { error } = useAuth();
  return (
    <Formulario size="default">
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
    </Formulario>
  );
};

export default FormReset;
