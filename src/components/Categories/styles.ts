import styled from "styled-components";
import { colors } from "../../globalStyles";

export const ContainerCat = styled.div`
  background-color: ${colors.lightGray};
  padding: 16px;
  border-radius: 8px;

  span {
    color: ${colors.vermelho};
    margin: 0 6px 6px;
    height: 8px;
    font-size: 12px;
  }

  #cat-name,
  #categoria-desp {
    background-color: ${colors.lighterGray};
  }
`;
