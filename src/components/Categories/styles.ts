import styled from "styled-components";
import { colors } from "../../globalStyles";

export const ContainerCat = styled.div`
    background-color: ${colors.lightGray};
    padding: 16px;
    border-radius: 8px;

    #cat-name, #categoria-desp {
        background-color: ${colors.lighterGray};
    }
`