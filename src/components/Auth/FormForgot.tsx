import { useForm } from "react-hook-form";
import { colors } from "../../globalStyles";
import Button from "../Button";
import Formulario from "../Formulario";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootReducer } from "../../Store";
import { authSchema } from "../../validations/BaseAuthSchema";
import * as yup from "yup";

type ForgotFormData = yup.InferType<typeof authSchema>;

const FormForgot = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register: loginInput,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(authSchema) });

  const { error } = useSelector((state: RootReducer) => state.auth);

  const onSubmit = async (data: ForgotFormData) => {
    const payload = {
      ...data,
    };
    await dispatch(login(payload)).unwrap();
    reset();
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
