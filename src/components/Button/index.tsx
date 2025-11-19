import type React from "react";
import { ButtonStyled } from "./styles";

export interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  bgColor: string;
  padding: "big" | "medium" | "small";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  bgColor,
  padding,
  onClick,
}) => {
  return (
    <ButtonStyled
      onClick={onClick}
      type={type}
      bgColor={bgColor}
      padding={padding}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;
