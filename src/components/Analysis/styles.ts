import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

export const Analysis = styled.div`
    background-color: ${colors.lightGray};
    width: 100%;
    border-radius: 8px;
    padding: 4px;
    
    ul {
        display: flex;
        justify-content: space-between;

        li {
            padding: 4px 8px;
            width: 100%;
            border-radius: 8px;
            text-align: center;
            cursor: pointer;
            font-size: 14px;
            line-height: 24px;
            @media (max-width: ${breakpoints.tablet}) {
                font-size: 12px;
            }
        }

        .is-active {
            background-color: ${colors.branco};
            box-shadow: ${colors.shadow};
        }

    }
`