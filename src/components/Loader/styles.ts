import styled from "styled-components";
import { colors } from "../../globalStyles";

export const ContainerLoader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    padding: 40px;

    p {
        margin-top: 40px;
        color: ${colors.gray};
    }
`