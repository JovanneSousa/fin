import styled, { createGlobalStyle } from "styled-components";
import { hexToRgb } from "./Utils";

export const colors = {
  rosa: "#c850c0",
  roxo: "#4158d0",
  gradient: `linear-gradient(-135deg, #c850c0, #4158d0)`,
  preto: "#000",
  shadow: "0 1px 3px 0 rgba(0, 0, 0, 0.3)",
  branco: "#fff",
  gray: "#666666",
  lightGray: "#e6e6e6",
  lighterGray: "#f5f5f5",
  darkGray: "#333333",
  verde: "#57b846",
  vermelho: "#e63946",
  azul: "#3498db",
  laranja: "#f39c12",
  transparent: "transparent",
};

export const IconBox = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  background-color: ${({ color }) => `rgba(${hexToRgb(color)}, 0.2)`};
  color: ${({ color }) => color || colors.verde};
`;

export const breakpoints = {
  desktop: "1024px",
  tablet: "768px",
  containerMaxWidth: "1472px",
};
export const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: lexend , sans-serif;
    list-style: none;
    text-decoration: none;
    
}


.main {
  width: 100%;
  max-height: 100vh;
  overflow-y: scroll;
}

#root {
    min-height: 100vh;
    display: flex;
}

body {
    background: ${colors.gradient};
    background-repeat: no-repeat;
    min-height: 100vh;
    position: relative;
    background-size: cover;
}

.col {
    flex-direction: column;
    padding: 20px 0;
}

.grid-card {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 8px;
    margin-bottom: 24px;

    @media (max-width: ${breakpoints.tablet}) {
        grid-template-columns: 1fr 1fr;
        gap: 8px;
    }
}

.button-container {
  display: flex;
  gap: 8px;
}

.container {
    max-width: ${breakpoints.containerMaxWidth};
    margin: 0 auto;
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items:center;
    width: 100%;
    
    @media (max-width: ${breakpoints.tablet}) {
        padding: 15px;
    }
}

.relative {
    display: flex;
    width: ${breakpoints.containerMaxWidth};
    @media (max-width: ${breakpoints.tablet}) {
        position: relative;
    }
}

.shadow {
      box-shadow:    0 0 15px rgba(0, 0, 0, 0.12),
    0 0 6px rgba(0, 0, 0, 0.08);
}

form {
    .input-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
    }

    input,
    select, 
    .input-span {
      padding: 8px 12px;
      font-size: 16px;
      border: none;
      outline: none;
      border-radius: 8px;
      background-color: ${colors.lightGray};
      color: ${colors.gray};
      font-weight: 500;
      width: 100%;
      transition: box-shadow 0.5s ease;

      &:focus {
        box-shadow: 0 0 12px ${colors.verde};
      }
    }
  }

  .input-check {
  }

  .input-check,
  .container-check,
  input[type="checkbox"] {
    display: flex;
    width: auto;
    padding: 8px 12px;
    font-size: 16px;
    border-radius: 8px;
    background-color: ${colors.lightGray};
    color: ${colors.gray};
    font-weight: 500;
    cursor: pointer;
    gap: 8px;

    &:checked {
      background-color: ${colors.verde};
    }
  }
  .container-check {
    display: block;

    & > .input-check {
      padding-left: 0;
      margin-top: 0;
    }
    .parcelas {
      margin-top: 8px;
      label {
        font-size: 12px;
        display: block;
        padding: 8px 0;
      }
      input {
        background-color: ${colors.lighterGray};
      }
    }
  }

  tspan {
    @media (max-width: ${breakpoints.tablet}) {
      font-size: 10px;
    }
  }
`;
