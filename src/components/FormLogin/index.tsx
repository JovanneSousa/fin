import Button from "../Button";
import "font-awesome/css/font-awesome.min.css";

const FormLogin = () => {
  return (
    <>
      <form>
        <div className="input-wrapper">
          <input type="email" placeholder="Email" id="email" />
          <i className="fa fa-envelope" aria-hidden="true"></i>
        </div>
        <div className="input-wrapper">
          <input type="password" placeholder="Senha" id="senha" />
          <i className="fa fa-lock" aria-hidden="true"></i>
        </div>
        <Button children="LOGIN" type="submit" />
      </form>
    </>
  );
};

export default FormLogin;
