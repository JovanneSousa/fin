import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootReducer } from "../Store";
import type { RegisterFormData } from "../components/Auth/FormRegister";
import { systemName } from "../Services/systemName";
import {
  emitirRecoveryToken,
  logarUsuario,
  registrarUsuario,
} from "../Store/reducers/auth";
import { useNavigate } from "react-router-dom";
import type { LoginFormData } from "../components/Auth/FormLogin";
import type { ForgotFormData } from "../components/Auth/FormForgot";

const useAuth = () => {
  const navigate = useNavigate();

  const { register, login, forgot, isAuthenticated, user } = useSelector(
    (state: RootReducer) => state.auth,
  );

  const dispatch = useDispatch<AppDispatch>();

  const loading = register.loading || login.loading || forgot.loading;
  const error = register.error || login.error || forgot.error;

  const logar = async (data: LoginFormData) => {
    const payload = {
      ...data,
      system: systemName,
    };
    await dispatch(logarUsuario(payload)).unwrap();
    navigate("/dashboard");
  };

  const registrar = async (data: RegisterFormData) => {
    const payload = {
      ...data,
      system: systemName,
      profile: "usuario",
    };
    await dispatch(registrarUsuario(payload)).unwrap();
    navigate("/dashboard");
  };

  const loginTeste = async () => {
    const user = import.meta.env.VITE_LOGIN_VISIT;
    const pass = import.meta.env.VITE_PASS_VISIT;

    const payload = {
      email: user,
      password: pass,
      system: systemName,
    };

    await dispatch(logarUsuario(payload));
    navigate("/dashboard");
  };

  const recoverToken = async (data: ForgotFormData) => {
    await dispatch(emitirRecoveryToken(data)).unwrap();
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    registrar,
    logar,
    loginTeste,
    recoverToken,
  };
};

export default useAuth;
