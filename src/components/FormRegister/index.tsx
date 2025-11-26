import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import type { AppDispatch, RootReducer } from "../../Store";
import { register } from "../../Store/reducers/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validations/registerSchema";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { colors } from "../../globalStyles";

type RegisterFormData = yup.InferType<typeof registerSchema>;

const FormRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootReducer) => state.auth);

  const {
    register: registerInput,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await dispatch(register(data)).unwrap();
      localStorage.setItem("token", result.token);
      reset();
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
    </form>
  );
};

export default FormRegister;
