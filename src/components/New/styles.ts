import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

export const NewSection = styled.section`
  background-color: ${colors.branco};
  border-radius: 16px;
  transition: height ease 0.3s;

  .type {
    margin: 16px 0;
  }

  label {
    font-size: 14px;
  }

  .button-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
`;
