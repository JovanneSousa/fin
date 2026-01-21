import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContainerStyledCor } from "./styles";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface ContainerCorProps {
  cor: string;
  onClick?: () => void;
  className?: string;
}

const ContainerCor = ({ cor, onClick, className }: ContainerCorProps) => {
  return (
    <ContainerStyledCor onClick={onClick} cor={cor}>
      {className == "is-active" && <FontAwesomeIcon icon={faCheck} />}
    </ContainerStyledCor>
  );
};

export default ContainerCor;
