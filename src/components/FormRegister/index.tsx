import { useDispatch } from "react-redux";
import Button from "../Button";
import type { AppDispatch } from "../../Store";
import { useState } from "react";
import { register } from "../../Store/reducers/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validations/registerSchema";

type RegisterFormData = yup.InferType<typeof registerSchema>;

const FormRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const [nome, setNome] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* NOME */}
      <input
        type="text"
        placeholder="Nome"
        {...registerInput("nome")}
      />
      {errors.nome && <span>{errors.nome.message}</span>}

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email"
        {...registerInput("email")}
      />
      {errors.email && <span>{errors.email.message}</span>}

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Senha"
        {...registerInput("password")}
      />
      {errors.password && <span>{errors.password.message}</span>}

      {/* CONFIRM PASSWORD */}
      <input
        type="password"
        placeholder="Confirme a senha"
        {...registerInput("confirmPassword")}
      />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

      <Button type="submit">Cadastrar</Button>
    </form>
  );
};

export default FormRegister;
