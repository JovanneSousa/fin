import type React from "react"
import { ButtonStyled } from "./styles"

export interface ButtonProps {
    children: React.ReactNode,
    type: 'button' | 'submit' | 'reset',
    disabled?: boolean,
    bgColor?: string,
    padding?: 'big' | 'medium' | 'small'
}

const Button: React.FC<ButtonProps> = ({
    children,
    type,
    bgColor,
    padding
}) => {
    return (
        <ButtonStyled type={type} bgColor={bgColor} padding={padding}>
            {children}
        </ButtonStyled>
    )
}

export default Button