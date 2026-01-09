import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faFlag } from "@fortawesome/free-regular-svg-icons";
import { faListUl, faTags, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../globalStyles";
import Button from "../Button";
import { ButtonContainer, Logo, SideBarSection } from "./styles";

const Sidebar = () => {
  return (
    <SideBarSection>
      <Logo>
        <img src="/FinanceBackup.svg" alt="icone do site" />
        <div>
          <h1>FinControl</h1>
          <p>Controle financeiro</p>
        </div>
      </Logo>
      <ButtonContainer>
        <div><FontAwesomeIcon icon={faAngleLeft} /></div>
        <Button padding="small" type="button" bgColor={colors.verde}>
          + Novo
        </Button>
      </ButtonContainer>
      <ul>
        <li className="is-active">
          <FontAwesomeIcon size="lg" icon={faHouse} />
          Dashboard
        </li>
        <li>
          <FontAwesomeIcon size="lg" icon={faListUl} />
          Transações
        </li>
        <li>
          <FontAwesomeIcon size="lg" icon={faTags} />
          Categorias
        </li>
        <li>
          <FontAwesomeIcon size="lg" icon={faFlag} />
          Planejamento
        </li>
      </ul>
    </SideBarSection>
  );
};

export default Sidebar;
