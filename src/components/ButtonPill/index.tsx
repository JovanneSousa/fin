import React from "react";
import { PillStyled } from "./styles";

interface PillProps {
  children: string;
}

const ButtonPill: React.FC<PillProps> = ({ children }) => {
  return <PillStyled>{children}</PillStyled>;
};

export default ButtonPill
