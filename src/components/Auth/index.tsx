import { useState } from "react";
import { LoginSection } from "./styles";
import { useDispatch } from "react-redux";
import { clearState } from "../../Store/reducers/auth";
import type { AppDispatch } from "../../Store";
import Loader from "../Loader";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import FormForgot from "./FormForgot";
import useAuth from "../../Hooks/useAuth";
import Feedback from "../Feedback";
import FormReset from "./FormReset";

export type PageType = "Login" | "Registrar" | "Forgot" | "Reset";

export interface AuthPageProps {
  resetPassData: {
    email: string;
    token: string;
  };
}

const Auth = ({ resetPassData }: AuthPageProps) => {
  const [internalPage, setInternalPage] = useState<PageType>("Login");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success } = useAuth();

  const handleToggle = (newPage: PageType) => {
    dispatch(clearState());
    setInternalPage(newPage);
  };

  const title = {
    Login: "Login",
    Registrar: "Registrar",
    Forgot: "Recuperar senha",
    Reset: "Texto",
  };

  const form = {
    Login: <FormLogin handleForgot={handleToggle} />,
    Registrar: <FormRegister />,
    Forgot: <FormForgot />,
    Reset: <FormReset resetPassData={resetPassData} />,
  };

  const buttonText = {
    Login: "Criar uma conta ",
    Registrar: "Voltar para o login ",
    Forgot: "Voltar para o login ",
    Reset: "Cancelar",
  };
  const page: PageType =
    resetPassData.email && resetPassData.token ? "Reset" : internalPage;

  return (
    <div className="container">
      <LoginSection>
        <div className="img">
          <img src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png" />
        </div>
        <div className="form">
          <span className="title">{title[page]}</span>
          {loading ? (
            <Loader />
          ) : success ? (
            <Feedback noButton success={success} />
          ) : (
            form[page]
          )}
          <a
            onClick={
              page == "Login"
                ? () => handleToggle("Registrar")
                : () => handleToggle("Login")
            }
            className="create"
          >
            {buttonText[page]}
            <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
          </a>
        </div>
      </LoginSection>
    </div>
  );
};

export default Auth;
