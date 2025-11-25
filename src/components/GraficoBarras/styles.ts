import styled from "styled-components";
import { breakpoints } from "../../globalStyles";

export const BarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;

    @media (max-width: ${breakpoints.tablet}) {
        height: 350px;
    }
    .title {
        height: 20%;
        display: flex;
        align-items: center;
    }
`