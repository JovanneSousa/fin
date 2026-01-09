import styled from "styled-components";
import { colors } from "../../globalStyles";

export const SideBarSection = styled.aside`
  background-color: ${colors.branco};
  padding: 8px 0;
  width: 300px;
  overflow-y: none;
  position: relative;

  ul {
    li {
      padding: 12px;
      display: flex;
      cursor: pointer;
      border-left: 5px solid ${colors.branco};
      transition: all ease 0.3s;

      svg {
        padding-right: 12px;
      }

      &.is-active {
        border-left: 5px solid ${colors.verde};
        color: ${colors.verde};
      }
      &:hover {
        background-color: ${colors.lightGray};
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  padding: 12px 24px;
  display: flex;
  flex-direction: column;

  div {
    position: absolute;
    right: -16px;
    background-color: ${colors.branco};
    padding: 4px;
    border: 1px solid ${colors.lightGray};
    border-radius: 16px;
    align-items: center;
    align-self: flex-end;
  }
`;

export const Logo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 0 24px;

  img {
    max-width: 50px;
    max-height: 50px;
  }

  p {
    color: ${colors.gray};
  }
`;
