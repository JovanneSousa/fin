import type React from "react";
import { ButtonStyled } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

export interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  bgColor: string;
  padding: "big" | "medium" | "small";
  onClick?: () => void;
  icon?: "left" | "right" | "down" | "up";
  className?: string;
}

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
      {icon === "left" ? (
        <FontAwesomeIcon icon={faChevronLeft} />
      ) : icon === "right" ? (
        <FontAwesomeIcon icon={faChevronRight} />
      ) : null}
      {children}

      {icon === "down" ? (
        <>
          {" "}
          <FontAwesomeIcon icon={faChevronDown} />
        </>
      ) : icon === "up" ? (
        <>
          {" "}
          <FontAwesomeIcon icon={faChevronUp} />
        </>
      ) : null}
    </ButtonStyled>
  );
};

export default Button;
