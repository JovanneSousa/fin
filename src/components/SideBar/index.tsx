import { faHouse } from "@fortawesome/free-regular-svg-icons";
import {
  faListUl,
  faTags,
  faAngleLeft,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import * as S from "./styles";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonNovo from "./ButtonNovo";
import useIsMobile from "../../Hooks/useIsMobile";
import InputToggle from "../InputToggle";
import { useTheme } from "styled-components";
import { Tabs } from "../../Utils/Enums/Tabs";

interface SideBarProps {
  activeTab: Tabs;
}

const Sidebar = ({ activeTab }: SideBarProps) => {
  const theme = useTheme();
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
          <li className={activeTab == Tabs.DASHBOARD ? "is-active" : ""}>
            <S.StyledLink isOpen={isOpen} to={"/dashboard"}>
              <S.StyledIcon padding="default" size="lg" icon={faHouse} />
              {isOpen && <p className="text-container">Dashboard</p>}
            </S.StyledLink>
          </li>
          <li className={activeTab == Tabs.TRANSACOES ? "is-active" : ""}>
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
          <li className={activeTab == Tabs.CATEGORIAS ? "is-active" : ""}>
            <S.StyledLink isOpen={isOpen} to={"/categorias"}>
              <S.StyledIcon padding="default" size="lg" icon={faTags} />
              {isOpen && <p className="text-container">Categorias</p>}
            </S.StyledLink>
          </li>
          {!isMobile && (
            <li className={activeTab == Tabs.RELATORIOS ? "is-active" : ""}>
              <S.StyledLink isOpen={isOpen} to={"/relatorios"}>
                <S.StyledIcon padding="default" size="lg" icon={faChartPie} />
                {isOpen && <p className="text-container">Relatórios</p>}
              </S.StyledLink>
            </li>
          )}
          <li>
            <InputToggle
              isOpen={isOpen}
              background={theme.defaultBackgroundColor}
              label={!isMobile && isOpen ? "Modo Escuro" : ""}
            />
          </li>
        </ul>
      </nav>
    </S.SideBarSection>
  );
};

export default Sidebar;
