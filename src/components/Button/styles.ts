import styled from "styled-components";
import { colors } from "../../globalStyles";

export const ButtonStyled = styled.button`
    padding: 8px 16px;
    border: none;
    outline: none;
    background-color: ${colors.verde};
    color: ${colors.branco};
    padding: 16px 32px;
    border-radius: 32px;
    margin-top: 8px;
    font-size: 16px;
    transition: all 0.4s ease;
    cursor: pointer;

    &:hover {
        background-color: ${colors.darkGray};
    }
`