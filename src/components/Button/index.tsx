import type React from "react";
import { ButtonStyled } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

export interface ButtonProps {
  children?: React.ReactNode;
  type: "button" | "submit" | "reset";
  bgColor: string;
  padding: "big" | "medium" | "small";
  onClick?: () => void;
  icon?: "left" | "right" | "down" | "up" | "doubleLeft" | "doubleRight";
  className?: string;
}

const icone = {
  left: <FontAwesomeIcon icon={faChevronLeft} />,
  right: <FontAwesomeIcon icon={faChevronRight} />,
  doubleLeft: <FontAwesomeIcon icon={faAngleDoubleLeft} />,
  doubleRight: <FontAwesomeIcon icon={faAngleDoubleRight} />,
  down: <FontAwesomeIcon icon={faChevronDown} />,
  up: <FontAwesomeIcon icon={faChevronUp} />,
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  bgColor,
  padding,
  onClick,
  icon,
  className,
}) => {
  return (
    <ButtonStyled
      className={className}
      onClick={onClick}
      type={type}
      bgColor={bgColor}
      padding={padding}
    >
      {icon && icone[icon]}
      {children}
    </ButtonStyled>
  );
};

export default Button;
