import { ContainerStyledCor } from "./styles";

interface ContainerCorProps {
  cor: string;
  onClick?: () => void;
  className?: string;
}

const ContainerCor = ({ cor, onClick, className }: ContainerCorProps) => {
  return (
    <ContainerStyledCor className={className} onClick={onClick} cor={cor} />
  );
};

export default ContainerCor;
