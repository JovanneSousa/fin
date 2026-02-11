import { useSearchParams } from "react-router-dom";
import Auth from "../components/Auth";
import useHealthApi from "../Hooks/useHealthApi";
import { useEffect } from "react";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const acordaApi = useHealthApi();

  useEffect(() => {
    acordaApi();
  }, [acordaApi]);

  const resetPassData = {
    email: searchParams.get("email"),
    token: searchParams.get("token"),
  };

  return <Auth resetPassData={resetPassData} />;
};

export default AuthPage;
