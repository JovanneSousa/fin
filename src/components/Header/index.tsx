import { jwtDecode } from "jwt-decode";
import { HeaderSection } from "./styles";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Store";
import { logout } from "../../Store/reducers/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../Button";
import { colors } from "../../globalStyles";

interface MyJwtPayload {
  unique_name: string;
  exp: number;
  iat: number;
  iss: string;
}

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("token");
  let decoded = null;

  const deslogar = () => {
    dispatch(logout());
    navigate("/");
  };

  if (token) {
    decoded = jwtDecode<MyJwtPayload>(token);
  }

  useEffect(() => {
    if (decoded?.exp && decoded.exp * 1000 <= Date.now()) {
      deslogar();
    }
  }, [decoded, deslogar]);

  return (
    <HeaderSection>
      <div className="container">
        <div>
          <h1>FinControl</h1>
          <p>
            Olá, <span>{decoded ? decoded.unique_name : "Visitante"}</span>
          </p>
        </div>

        <Button bgColor={colors.azul} padding="small" type="button" children='Logout' onClick={deslogar}/>
      </div>
    </HeaderSection>
  );
};

export default Header;
