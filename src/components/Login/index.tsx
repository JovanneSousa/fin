import { useState } from "react";
import FormRegister from "../FormRegister";
import { LoginSection } from "./styles";
import FormLogin from "../FormLogin";

const Login = () => {
  const [isLoginPageActive, setIsLoginPageActive] = useState(true);

  const title = isLoginPageActive ? "Login" : "Registrar";
  const Form = isLoginPageActive ? FormLogin : FormRegister;
  const buttonText = isLoginPageActive
    ? "Criar uma conta"
    : "Voltar para o login";

  return (
    <LoginSection>
      <div className="img">
        <img src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png" />
      </div>
      <div className="form">
        <span className="title">{title}</span>
        <Form />
        <button
          onClick={() => setIsLoginPageActive(!isLoginPageActive)}
          className="create"
        >
          {buttonText}
          <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
        </button>
      </div>
    </LoginSection>
  );
};

export default Login;
