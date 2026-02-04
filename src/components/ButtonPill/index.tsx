import React from "react";
import { PillStyled } from "./styles";

interface PillProps {
  children: string;
  className?: string;
  onClick?: () => void;
  radius?: boolean;
}

const ButtonPill: React.FC<PillProps> = ({
  children,
  className,
  onClick,
  radius = true,
}) => {
  return (
    <PillStyled radius={radius} onClick={onClick} className={className}>
      {children}
    </PillStyled>
  );
};

export default ButtonPill;
