import styled, { createGlobalStyle } from "styled-components";
import { hexToRgb } from "./Utils";

export const colors = {
  rosa: "#c850c0",
  roxo: "#4158d0",
  gradient: `linear-gradient(-135deg, #c850c0, #4158d0)`,
  textColor: "#000",
  defaultBackgroundColor: "#fff",

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
  verdeClaro: "#e6f4ea",
  vermelhoClaro: "#fde8ea",
};

export const darkColors = {
  /* Base */
  background: "#121212", // fundo principal
  surface: "#1e1e1e", // cards, modais
  surfaceAlt: "#252525", // hover, áreas elevadas

  /* Texto */
  textPrimary: "#eaeaea", // texto principal
  textSecondary: "#b3b3b3", // texto secundário
  textDisabled: "#7a7a7a",

  /* Cinzas */
  gray: "#9e9e9e",
  darkGray: "#2c2c2c",
  darkerGray: "#1a1a1a",

  /* Brand / Destaque */
  rosa: "#d16cc8", // rosa suavizado
  roxo: "#5c6ee5", // roxo menos agressivo
  gradient: "linear-gradient(-135deg, #d16cc8, #5c6ee5)",

  /* Feedback */
  verde: "#6fcf97",
  vermelho: "#eb5757",
  azul: "#56ccf2",
  laranja: "#f2c94c",

  /* Backgrounds de feedback */
  verdeClaro: "rgba(111, 207, 151, 0.15)",
  vermelhoClaro: "rgba(235, 87, 87, 0.15)",

  /* Outros */
  branco: "#ffffff",
  preto: "#000000",
  transparent: "transparent",

  /* Sombra */
  shadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
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
    color: ${colors.textColor};
}

.flex {
  display: flex;
  gap: 8px;
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
    margin-bottom: 16px;

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
      padding: 12px;
      font-size: 16px;
      border: none;
      outline: none;
      border-radius: 32px;
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

  

  tspan {
    @media (max-width: ${breakpoints.tablet}) {
      font-size: 10px;
    }
  }
`;
