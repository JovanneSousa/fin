import { faHouse, faFlag } from "@fortawesome/free-regular-svg-icons";
import {
  faListUl,
  faTags,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import * as S from "./styles";
import type { Tabs } from "../../Layouts/DefaultLayout";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonNovo from "./ButtonNovo";
import useIsMobile from "../../Hooks/useIsMobile";
interface SideBarProps {
  activeTab: Tabs;
}

const Sidebar = ({ activeTab }: SideBarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile();

  return (
    <S.SideBarSection className="shadow" isOpen={isOpen}>
      <S.Logo>
        <img src="/FinanceBackup.svg" alt="icone do site" />
        <div className="text-container">
          <h1>FinControl</h1>
          <p>Controle financeiro</p>
        </div>
      </S.Logo>
      <div
        className={`toggle ${isOpen ? "open" : "closed"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
      {!isMobile && <ButtonNovo isOpen={isOpen} />}

      <nav>
        <ul className="ul-menu">
          <li className={activeTab == "dashboard" ? "is-active" : ""}>
            <S.StyledLink isOpen={isOpen} to={"/dashboard"}>
              <S.StyledIcon padding="default" size="lg" icon={faHouse} />
              {isOpen && <p className="text-container">Dashboard</p>}
            </S.StyledLink>
          </li>
          <li className={activeTab == "transacoes" ? "is-active" : ""}>
            <S.StyledLink isOpen={isOpen} to={"/transacoes"}>
              <S.StyledIcon padding="default" size="lg" icon={faListUl} />
              {isOpen && <p className="text-container">Transações</p>}
            </S.StyledLink>
          </li>
          {isMobile && (
            <li>
              <ButtonNovo isOpen={isOpen} />
            </li>
          )}
          <li className={activeTab == "categorias" ? "is-active" : ""}>
            <S.StyledLink isOpen={isOpen} to={"/categorias"}>
              <S.StyledIcon padding="default" size="lg" icon={faTags} />
              {isOpen && <p className="text-container">Categorias</p>}
            </S.StyledLink>
          </li>
          <li className={activeTab == "planejamento" ? "is-active" : ""}>
            <S.StyledLink isOpen={isOpen} to={"/dashboard"}>
              <S.StyledIcon padding="default" size="lg" icon={faFlag} />
              {isOpen && <p className="text-container">Planejamento</p>}
            </S.StyledLink>
          </li>
          {/* <li>
            <InputToggle background={colors.defaultBackgroundColor} label="Modo Escuro"/>
          </li> */}
        </ul>
      </nav>
    </S.SideBarSection>
  );
};

export default Sidebar;
