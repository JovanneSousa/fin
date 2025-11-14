import type React from "react"
import { ButtonStyled } from "./styles"

interface ButtonProps {
    children: React.ReactNode,
    type: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
    children,
    type
}) => {
    return (
        <ButtonStyled type={type}>
            {children}
        </ButtonStyled>
    )
}

export default Button