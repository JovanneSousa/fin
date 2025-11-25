import React from "react";
import { PillStyled } from "./styles";

interface PillProps {
  children: string;
  className?: string;
  onClick?: () => void
}

const ButtonPill: React.FC<PillProps> = ({ children, className, onClick }) => {
  return <PillStyled onClick={onClick} className={className}>{children}</PillStyled>;
};

export default ButtonPill
