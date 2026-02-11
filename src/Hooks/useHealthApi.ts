import apiAuth from "../Services/apiAuth";
import api from "../Services/api";

const useHealthApi = () => {
  const apiEmail = import.meta.env.VITE_API_EMAIL_URL;
  const wakeAuth = () =>
    fetch(apiAuth + "api/auth/health", {
      method: "GET",
      mode: "no-cors",
    });
  const wakeEmail = () =>
    fetch(apiEmail + "/email/health", {
      method: "GET",
      mode: "no-cors",
    });
  const wakeTransacao = () =>
    fetch(api + "api/transacoes/health", {
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
