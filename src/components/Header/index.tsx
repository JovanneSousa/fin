import { HeaderSection } from "./styles";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Store";
import { logout } from "../../Store/reducers/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../Button";
import { colors } from "../../globalStyles";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const deslogar = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (Number(localStorage.getItem("expiresIn")) * 1000 <= Date.now()) {
      deslogar();
    }
  }, [ deslogar]);

  return (
    <HeaderSection>
      <div className="container">
        <div>
          <h1>FinControl</h1>
          <p>
            Olá, <span>{localStorage.getItem("user")}</span>
          </p>
        </div>

        <Button
          bgColor={colors.azul}
          padding="small"
          type="button"
          children="Logout"
          onClick={deslogar}
        />
      </div>
    </HeaderSection>
  );
};

export default Header;
