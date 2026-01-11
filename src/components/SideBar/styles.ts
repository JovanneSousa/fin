import styled from "styled-components";
import { colors } from "../../globalStyles";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SideBarSection = styled.aside.withConfig({
  shouldForwardProp: (prop) => !["isOpen"].includes(prop),
})<PropsOpen>`
  background-color: ${colors.branco};
  padding: 8px 0;
  position: relative;
  z-index: 2;
  width: ${({ isOpen }) => (isOpen ? "270px" : "84px")};
  transition: width 0.3s ease;

  .text-container {
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-8px")});
    transition: opacity 0.2s ease, transform 0.3s ease;
    white-space: nowrap;
  }

  &:hover {
    .toggle {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .toggle {
    position: absolute;
    right: -16px;
    top: 68px;
    background-color: ${colors.branco};
    padding: 4px;
    border: 1px solid ${colors.lightGray};
    border-radius: 16px;
    align-items: center;
    align-self: flex-end;
    cursor: pointer;

    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;

    &.open {
      transform: rotate(0deg);
    }

    &.closed {
      transform: rotate(180deg);
    }
  }

  button {
    margin: 0;
  }

  ul {
    overflow: hidden;
    li {
      display: flex;
      cursor: pointer;
      border-left: 5px solid ${colors.branco};
      transition: all ease 0.3s;

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

export const Label = styled.p.withConfig({
  shouldForwardProp: (prop) => !["isOpen"].includes(prop),
})<PropsOpen>`
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-8px")});
  transition: opacity 0.2s ease, transform 0.2s ease;
  white-space: nowrap;
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  padding: 12px 24px;
`;

export const ButtonContainer = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 0 12px;

  img {
    max-width: 60px;
    max-height: 60px;
  }

  p {
    color: ${colors.gray};
  }
`;

interface PropsOpen {
  isOpen: boolean;
}

export const StyledLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => !["isOpen"].includes(prop),
})<PropsOpen>`
  display: flex;
  text-decoration: none;
  color: inherit;
  width: 100%;
  height: 100%;
  align-items: center;
`;
