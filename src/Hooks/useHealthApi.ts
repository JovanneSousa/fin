import apiAuth from "../Services/apiAuth";
import api from "../Services/api";

const useHealthApi = () => {
  const apiEmail = import.meta.env.VITE_API_EMAIL_URL;
  const wakeAuth = () => fetch(apiAuth + "api/auth/heath");
  const wakeEmail = () => fetch(apiEmail + "/api/email/health");
  const wakeTransacao = () => fetch(api + "api/transacoes/health");

  const acordaApis = () => {
    wakeAuth();
    wakeEmail();
    wakeTransacao();
  };

  return acordaApis;
};

export default useHealthApi;
