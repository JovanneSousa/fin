import { HeaderSection } from "./styles";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Store";
import { logout } from "../../Store/reducers/auth";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button";
import { colors } from "../../globalStyles";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = useState(true);
  const expiresIn = Number(localStorage.getItem("expiresIn"));
  const lastScrollY = useRef(0);

  const deslogar = useCallback(() => {
    dispatch(logout());
    navigate("/");
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setShow(currentScrollY < lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!expiresIn || Date.now() >= expiresIn) {
      deslogar();
    }
  }, [expiresIn, deslogar]);

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
