import { useState } from "react";
import FormRegister from "../FormRegister";
import { LoginSection } from "./styles";
import FormLogin from "../FormLogin";

const Login = () => {
  const [isLoginPageActive, setIsLoginPageActive] = useState(true);

  return (
    <LoginSection>
      <div className="img">
        <img src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png" />
      </div>
      <div className="form">
        <span className="title">
          {isLoginPageActive ? "Login" : "Registar"}
        </span>
        {isLoginPageActive ? (
          <FormLogin />
        ) : (
          <FormRegister />
        )}
        {isLoginPageActive ? (
          <button
            className="create"
          >
            Criar uma conta{" "}
            <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
          </button>
        ) : (
          <button
            className="create"
          >
            Voltar para o login{" "}
            <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
          </button>
        )}
      </div>
    </LoginSection>
  );
};

export default Login;
