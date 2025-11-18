import styled from "styled-components";
import { colors } from "../../globalStyles";

export const CardStyled = styled.div`
    background-color: ${colors.branco};
    border-radius: 16px;
    padding: 24px;
    box-shadow: ${colors.shadow};

    .valor {
        font-size: 24px;
        font-weight: bold;
        color: ${colors.preto};
        margin: 8px 0;
    }

    p {
        font-size: 14px;
        color: ${colors.gray};
    }
`