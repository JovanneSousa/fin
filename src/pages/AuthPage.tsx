import { useSearchParams } from "react-router-dom";
import Auth from "../components/Auth";

const AuthPage = () => {
  const [searchParams] = useSearchParams();

  const resetPassData = {
    email: searchParams.get("email"),
    token: searchParams.get("token"),
  };

  return <Auth resetPassData={resetPassData} />;
};

export default AuthPage;
