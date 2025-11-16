import { useDispatch } from "react-redux";
import Button from "../Button";
import "font-awesome/css/font-awesome.min.css";
import { type AppDispatch } from "../../Store";
import { login } from "../../Store/reducers/auth";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../validations/loginSchema";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type LoginFormData = yup.InferType<typeof loginSchema>;

const FormLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

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
      const result = await dispatch(login(data)).unwrap();
      localStorage.setItem("token", result.token);
      reset();
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
        {errors.email && <span>{errors.email.message}</span>}
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Senha"
            {...loginInput("password")}
          />
          <i className="fa fa-lock" aria-hidden="true"></i>
        </div>
        {errors.password && <span>{errors.password.message}</span>}
        <Button children="LOGIN" type="submit" />
      </form>
    </>
  );
};

export default FormLogin;
