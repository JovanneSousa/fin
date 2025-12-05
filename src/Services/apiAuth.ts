import axios from "axios";

const apiUrlLogin = import.meta.env.VITE_API_URL_LOGIN;

const apiAuth = axios.create({
  baseURL: apiUrlLogin,
});
export default apiAuth;
