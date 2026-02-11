import { useForm } from "react-hook-form";
import type { AuthPageProps } from ".";
import Formulario from "../Formulario";
import { resetPassSchema } from "../../validations/ResetPassSchema";
import * as yup from "yup";
import Button from "../Button";
import { colors } from "../../globalStyles";
import useAuth from "../../Hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";

export type ResetPassFormData = yup.InferType<typeof resetPassSchema>;

const FormReset = ({ resetPassData }: AuthPageProps) => {
  const { redefinirSenha, error } = useAuth();

  const {
    register: registerInput,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPassFormData>({
    defaultValues: {
      email: resetPassData.email ?? "",
      token: resetPassData.token ?? "",
    },
    resolver: yupResolver(resetPassSchema),
  });

  const onSubmit = async (data: ResetPassFormData) => {
    const result = await redefinirSenha(data);
    if (result.success) reset();
    console.log(result.success);
  };

  return (
    <Formulario size="default" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <input
          type="password"
          placeholder="Nova senha"
          {...registerInput("password")}
        />
        <i className="fa fa-lock" aria-hidden="true"></i>
        <span>{errors.password?.message}</span>
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          placeholder="Confirme a nova senha"
          {...registerInput("confirmPassword")}
        />
        <i className="fa fa-lock" aria-hidden="true"></i>
        <span className="error-span">{errors.confirmPassword?.message}</span>
      </div>
      <Button
        padding="big"
        bgColor={colors.verde}
        children="Salvar"
        type="submit"
      />{" "}
      {error && <span className="error-message-span">{error}</span>}
    </Formulario>
  );
};

export default FormReset;
