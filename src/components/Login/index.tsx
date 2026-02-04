import { useState } from "react";
import FormRegister from "../FormRegister";
import { LoginSection } from "./styles";
import FormLogin from "../FormLogin";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../../Store/reducers/auth";
import type { AppDispatch, RootReducer } from "../../Store";
import Loader from "../Loader";

const Login = () => {
  const [isLoginPageActive, setIsLoginPageActive] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootReducer) => state.auth);

  const title = isLoginPageActive ? "Login" : "Registrar";
  const Form = loading ? Loader : isLoginPageActive ? FormLogin : FormRegister;
  const buttonText = isLoginPageActive
    ? "Criar uma conta "
    : "Voltar para o login ";

  const handleToggle = () => {
    dispatch(clearState());
    setIsLoginPageActive(!isLoginPageActive);
  };
  return (
    <div className="container">
      <LoginSection>
        <div className="img">
          <img src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png" />
        </div>
        <div className="form">
          <span className="title">{title}</span>
          <Form key={isLoginPageActive ? "login" : "register"} />
          <a onClick={handleToggle} className="create">
            {buttonText}
            <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
          </a>
        </div>
      </LoginSection>
    </div>
  );
};

export default Login;
