import { HeaderSection } from "./styles";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Store";
import { logout } from "../../Store/reducers/auth";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button";
import { colors } from "../../globalStyles";

interface HeaderProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

const Header = ({ scrollRef }: HeaderProps) => {
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
    const el = scrollRef.current;
    if (!el) return;

    lastScrollY.current = el.scrollTop;

    const handleScroll = () => {
      const currentScrollY = el.scrollTop;

      setShow(currentScrollY < lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

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
