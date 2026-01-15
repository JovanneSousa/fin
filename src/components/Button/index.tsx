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
  faClose,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

type IconTypes =
  | "left"
  | "right"
  | "down"
  | "up"
  | "doubleLeft"
  | "doubleRight"
  | "close"
  | "plus";

export interface ButtonProps {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  bgColor: string;
  padding?: "big" | "medium" | "small";
  onClick?: () => void;
  icon?: IconTypes;
  className?: string;
  disabled?: boolean;
}

const icone = {
  left: <FontAwesomeIcon icon={faChevronLeft} />,
  right: <FontAwesomeIcon icon={faChevronRight} />,
  doubleLeft: <FontAwesomeIcon icon={faAngleDoubleLeft} />,
  doubleRight: <FontAwesomeIcon icon={faAngleDoubleRight} />,
  down: <FontAwesomeIcon icon={faChevronDown} />,
  up: <FontAwesomeIcon icon={faChevronUp} />,
  close: <FontAwesomeIcon icon={faClose} />,
  plus: <FontAwesomeIcon icon={faPlus} />,
};

const Button = ({
  children,
  type = "button",
  bgColor,
  padding = "small",
  onClick,
  icon,
  className,
  disabled,
}: ButtonProps) => {
  return (
    <ButtonStyled
      className={className}
      onClick={onClick}
      type={type}
      bgColor={bgColor}
      padding={padding}
      disabled={disabled}
    >
      {icon && icone[icon]} {children}
    </ButtonStyled>
  );
};

export default Button;
