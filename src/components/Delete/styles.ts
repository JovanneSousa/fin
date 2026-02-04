import styled from "styled-components";
import { colors } from "../../globalStyles";

export const DeleteSection = styled.div`
  background-color: ${colors.defaultBackgroundColor};
  padding: 16px;
  border-radius: 8px;
  max-width: 400px;

  .title-delete {
    padding-bottom: 8px;
    border-bottom: 1px solid ${colors.lightGray};
    text-align: center;
  }

  .desp-name {
    padding: 16px 0;
  }

  .button-container {
    display: flex;
    gap: 10px;
  }
`;
