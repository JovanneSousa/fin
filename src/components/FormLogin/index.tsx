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

type LoginFormData = yup.InferType<typeof loginSchema>;

const FormLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const { loading, error } = useSelector((state: RootReducer) => state.auth)

  const {
    register: loginInput,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(login(data)).unwrap();
      reset();
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <input type="email" placeholder="Email" {...loginInput("email")} />
          <i className="fa fa-envelope" aria-hidden="true"></i>
        </div>
        <span>{errors.email?.message}</span>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Senha"
            {...loginInput("password")}
          />
          <i className="fa fa-lock" aria-hidden="true"></i>
        </div><span>{errors.password?.message}</span>
        <Button padding="big" bgColor={colors.verde} disabled={loading} children="LOGIN" type="submit" />
        {error && <span className="error-message-span">{error}</span>}
      </form>
    </>
  );
};

export default FormLogin;
