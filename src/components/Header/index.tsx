import { HeaderSection } from "./styles";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Store";
import { logout } from "../../Store/reducers/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../Button";
import { colors } from "../../globalStyles";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const deslogar = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scroll para baixo
        setShow(false);
      } else {
        // Scroll para cima
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    if (Number(localStorage.getItem("expiresIn")) * 1000 <= Date.now()) {
      deslogar();
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [deslogar, lastScrollY]);

  return (
    <HeaderSection className={show ? "show" : "hide"}>
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
