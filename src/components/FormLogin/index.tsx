import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import "font-awesome/css/font-awesome.min.css";
import { type AppDispatch, type RootReducer } from "../../Store";
import { login } from "../../Store/reducers/auth";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../validations/loginSchema";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { colors } from "../../globalStyles";
import { systemName } from "../../Services/systemName";

type LoginFormData = yup.InferType<typeof loginSchema>;

const FormLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error } = useSelector((state: RootReducer) => state.auth);

  const {
    register: loginInput,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const payload = {
      ...data,
      system: systemName,
    };
    await dispatch(login(payload)).unwrap();
    reset();
    navigate("/home");
  };

  const loginTeste = async () => {
    const user = import.meta.env.VITE_LOGIN_VISIT;
    const pass = import.meta.env.VITE_PASS_VISIT;

    await dispatch(login({ email: user, password: pass }));
    navigate("/home");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
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
