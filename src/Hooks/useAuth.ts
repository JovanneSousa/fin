import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootReducer } from "../Store";
import type { RegisterFormData } from "../components/Auth/FormRegister";
import { systemName } from "../Services/systemName";
import {
  emitirRecoveryToken,
  logarUsuario,
  registrarUsuario,
  resetarSenha,
} from "../Store/reducers/auth";
import { useLocation, useNavigate } from "react-router-dom";
import type { LoginFormData } from "../components/Auth/FormLogin";
import type { ForgotFormData } from "../components/Auth/FormForgot";
import type { ResetPassFormData } from "../components/Auth/FormReset";

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { register, login, forgot, isAuthenticated, user, reset } = useSelector(
    (state: RootReducer) => state.auth,
  );

  const limparParams = () => {
    navigate(location.pathname, { replace: true });
  };

  const dispatch = useDispatch<AppDispatch>();

  const loading =
    register.loading || login.loading || forgot.loading || reset.loading;

  const error = register.error || login.error || forgot.error || reset.error;

  const success = forgot.success || reset.success;

  const logar = async (data: LoginFormData) => {
    const payload = {
      ...data,
      system: systemName,
    };
    await dispatch(logarUsuario(payload)).unwrap();
    navigate("/dashboard");
  };

  const redefinirSenha = async (data: ResetPassFormData) =>
    await dispatch(resetarSenha(data)).unwrap();

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
    success,
    isAuthenticated,
    user,
    loading,
    error,
    registrar,
    logar,
    loginTeste,
    recoverToken,
    redefinirSenha,
    limparParams,
  };
};

export default useAuth;
