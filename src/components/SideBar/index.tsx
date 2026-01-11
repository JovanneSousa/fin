import { faHouse, faFlag } from "@fortawesome/free-regular-svg-icons";
import {
  faListUl,
  faTags,
  faAngleLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../globalStyles";
import Button from "../Button";
import * as S from "./styles";
import type { Tabs } from "../../Layouts/DefaultLayout";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SideBarProps {
  activeTab: Tabs;
}

const Sidebar = ({ activeTab }: SideBarProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <S.SideBarSection isOpen={isOpen}>
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
      <S.ButtonContainer>
        <Button padding="small" type="button" bgColor={colors.verde}>
          {isOpen ? "+ Novo" : <FontAwesomeIcon icon={faPlus} />}
        </Button>
      </S.ButtonContainer>
      <ul>
        <li className={activeTab == "dashboard" ? "is-active" : ""}>
          <S.StyledLink isOpen={isOpen} to={"/dashboard"}>
            <S.StyledIcon size="lg" icon={faHouse} />
            {isOpen && <p className="text-container">Dashboard</p>}
          </S.StyledLink>
        </li>
        <li className={activeTab == "transacoes" ? "is-active" : ""}>
          <S.StyledLink isOpen={isOpen} to={"/transacoes"}>
            <S.StyledIcon size="lg" icon={faListUl} />
            {isOpen && <p className="text-container">Transações</p>}
          </S.StyledLink>
        </li>
        <li className={activeTab == "categorias" ? "is-active" : ""}>
          <S.StyledLink isOpen={isOpen} to={"/categorias"}>
            <S.StyledIcon size="lg" icon={faTags} />
            {isOpen && <p className="text-container">Categorias</p>}
          </S.StyledLink>
        </li>
        <li className={activeTab == "planejamento" ? "is-active" : ""}>
          <S.StyledLink isOpen={isOpen} to={"/dashboard"}>
            <S.StyledIcon size="lg" icon={faFlag} />
            {isOpen && <p className="text-container">Planejamento</p>}
          </S.StyledLink>
        </li>
      </ul>
    </S.SideBarSection>
  );
};

export default Sidebar;
