import type React from "react";
import { ButtonStyled } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

export interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  bgColor: string;
  padding: "big" | "medium" | "small";
  onClick?: () => void;
  icon?: "left" | "right" | "calendar";
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  bgColor,
  padding,
  onClick,
  icon,
}) => {
  return (
    <ButtonStyled
      onClick={onClick}
      type={type}
      bgColor={bgColor}
      padding={padding}
    >
      {icon === "left" ? (
        <FontAwesomeIcon icon={faChevronLeft} />
      ) : icon === "right" ? (
        <FontAwesomeIcon icon={faChevronRight} />
      ) : icon === "calendar" ? (
        <FontAwesomeIcon icon={faCalendar } />
      ) : (
        null
      )}
      {children}
    </ButtonStyled>
  );
};

export default Button;
