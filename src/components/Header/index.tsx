import { HeaderSection } from "./styles";
import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import { colors } from "../../globalStyles";
import type { Tabs } from "../../Layouts/DefaultLayout";
import { logout } from "../../Store/reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../Store";

interface HeaderProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  activeTabs: Tabs;
}

const texto = {
  dashboard: "Dashboard",
  planejamento: "Planejamento",
  categorias: "Categorias",
  transacoes: "Transações",
};

const Header = ({ scrollRef, activeTabs }: HeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const deslogar = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

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

  return (
    <HeaderSection className={show ? "show" : "hide"}>
      <div className="container">
        <div>
          <p className="title">{texto[activeTabs]}</p>
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
