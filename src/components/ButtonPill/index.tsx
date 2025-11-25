import React from "react";
import { PillStyled } from "./styles";

interface PillProps {
  children: string;
  className?: string;
}

const ButtonPill: React.FC<PillProps> = ({ children, className }) => {
  return <PillStyled className={className}>{children}</PillStyled>;
};

export default ButtonPill
