import { faHouse, faFlag } from "@fortawesome/free-regular-svg-icons";
import {
  faListUl,
  faTags,
  faAngleLeft,
  faPlus,
  faArrowTrendUp,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../globalStyles";
import Button from "../Button";
import * as S from "./styles";
import type { Tabs } from "../../Layouts/DefaultLayout";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormNew } from "../../contexts/FormNew/useFormNew";
import type { ModalTypes } from "../../contexts/FormNew/FormNewContext";
import InputToggle from "../InputToggle";

interface SideBarProps {
  activeTab: Tabs;
}

const Sidebar = ({ activeTab }: SideBarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isNewOpen, setIsNewOpen] = useState(false);

  const fechaNewSection = () => {
    setIsNewOpen(false);
  };

  const { abreModal } = useFormNew();

  const handleOpenModal = (type: ModalTypes) => {
    abreModal(type);
    setIsNewOpen(false);
  };

  return (
    <S.SideBarSection onClick={fechaNewSection} isOpen={isOpen}>
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
      <S.ButtonContainer onClick={(e) => e.stopPropagation()}>
        <Button
          onClick={() => setIsNewOpen(true)}
          padding="small"
          type="button"
          bgColor={colors.verde}
        >
          {isOpen ? "+ Novo" : <FontAwesomeIcon icon={faPlus} />}
        </Button>
        <div className={`menu-novo shadow ${isNewOpen ? "new-active" : ""}`}>
          <ul>
            <li onClick={() => handleOpenModal("despesa")}>
              <S.StyledIcon
                color={colors.vermelho}
                padding={"zero"}
                icon={faArrowTrendDown}
              />
              Despesa
            </li>
            <li onClick={() => handleOpenModal("receita")}>
              <S.StyledIcon
                color={colors.verde}
                padding={"zero"}
                icon={faArrowTrendUp}
              />
              Receita
            </li>
            <li onClick={() => handleOpenModal("categoria")}>
              <S.StyledIcon
                color={colors.azul}
                padding={"zero"}
                icon={faTags}
              />
              Categoria
            </li>
          </ul>
        </div>
      </S.ButtonContainer>
      <nav>
        <ul>
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
          <li>
            <InputToggle background={colors.defaultBackgroundColor} label="Modo Escuro"/>
          </li>
        </ul>
      </nav>
    </S.SideBarSection>
  );
};

export default Sidebar;
