import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SideBarSection = styled.aside.withConfig({
  shouldForwardProp: (prop) => !["isOpen"].includes(prop),
})<PropsOpen>`
  background-color: ${colors.defaultBackgroundColor};
  padding: 8px 0;
  position: relative;
  z-index: 2;
  width: ${({ isOpen }) => (isOpen ? "270px" : "84px")};
  transition: width 0.3s ease;

  .text-container {
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-8px")});
    transition:
      opacity 0.2s ease,
      transform 0.3s ease;
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
    background-color: ${colors.defaultBackgroundColor};
    padding: 4px;
    border: 1px solid ${colors.lightGray};
    border-radius: 16px;
    align-items: center;
    align-self: flex-end;
    cursor: pointer;

    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;

    &.open {
      transform: rotate(0deg);
    }

    &.closed {
      transform: rotate(180deg);
    }
  }

  ul {
    li {
      display: flex;
      cursor: pointer;
      border-left: 5px solid ${colors.defaultBackgroundColor};
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

  @media (max-width: ${breakpoints.tablet}) {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    padding: 0;

    width: 100%;
    display: flex;
    align-items: center;

    nav,
    .ul-menu {
      display: flex;
      width: 100%;
      justify-content: space-between;

      li {
        border-left: none !important;
        border-bottom: 5px solid ${colors.defaultBackgroundColor};
        transition: all ease 0.3s;

        &.is-active {
          border-bottom: 5px solid ${colors.verde};
          color: ${colors.verde};
        }
        &:hover {
          background-color: inherit;
        }
      }
    }

    .text-container {
      display: none;
    }
  }

  @media (min-width: ${breakpoints.tablet}) {
    ul {
      overflow: hidden;
    }
  }
`;

export const Label = styled.p.withConfig({
  shouldForwardProp: (prop) => !["isOpen"].includes(prop),
})<PropsOpen>`
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-8px")});
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  white-space: nowrap;
`;

interface StyledIconProps {
  padding: "zero" | "default";
  color?: string;
}

export const StyledIcon = styled(FontAwesomeIcon).withConfig({
  shouldForwardProp: (prop) => !["padding", "color"].includes(prop),
})<StyledIconProps>`
  padding: ${({ padding }) => (padding == "zero" ? "0 24px" : "12px 24px")};
  color: ${({ color }) => (color ? color : "inherit")};
`;

export const ButtonContainer = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  position: relative;

  button {
    margin: 0;
    position: relative;
  }

  .menu-novo {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: ${colors.defaultBackgroundColor};
    width: 266px;
    z-index: 1;
    border-radius: 16px;
    padding: 8px 0;

    opacity: 0;
    pointer-events: none;
    transform: translateY(-8px);
    transition:
      opacity 0.25s ease,
      transform 0.25s ease,
      visibility 0.25s ease;
    visibility: hidden;

    ul {
      width: 100%;
      li {
        padding: 8px;
        border: 0;
        width: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;

        &:hover {
          background-color: ${colors.lightGray};
        }
      }
    }

    &.new-active {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
      visibility: visible;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 64px;
    height: 64px;

    .menu-novo {
      top: -150px;
      left: -100px;
    }
  }
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
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
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
