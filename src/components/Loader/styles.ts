import styled from "styled-components";
import { colors } from "../../globalStyles";

export const ContainerLoader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;

    p {
        color: ${colors.gray};
    }
`