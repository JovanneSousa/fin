import apiAuth from "../Services/apiAuth";
import api from "../Services/api";

const useHealthApi = () => {
  const apiEmail = import.meta.env.VITE_API_EMAIL_URL;
  const wakeAuth = () => apiAuth.get("api/auth/health");
  const wakeTransacao = () => api.get("api/transacoes/health");
  const wakeEmail = () =>
    fetch(apiEmail + "/email/health", {
      method: "GET",
      mode: "no-cors",
    });

  const acordaApis = () => {
    try {
      wakeAuth();
      wakeEmail();
      wakeTransacao();
    } catch (e) {
      console.log("Api acordando... " + e);
    }
  };

  return acordaApis;
};

export default useHealthApi;
