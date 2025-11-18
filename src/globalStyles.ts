import { createGlobalStyle } from "styled-components";

export const colors = {
  rosa: "#c850c0",
  roxo: "#4158d0",
  gradient: `linear-gradient(-135deg, #c850c0, #4158d0)`,
  preto: "#000",
  branco: "#fff",
  gray: "#666666",
  lightGray: "#e6e6e6",
  darkGray: "#333333",
  verde: "#57b846",
  vermelho: "#e63946",
};

export const breakpoints = {
  desktop: "1024px",
  tablet: "768px",
  containerMaxWidth: "1200px",
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

html, #root {
    height: 100%;
}

body {
    background: ${colors.gradient};
    background-repeat: no-repeat;
    min-height: 100vh;
    height: 100%;
    position: relative;

    @media (max-width: ${breakpoints.tablet}) {
        padding: 15px;
        overflow: hidden;
    }
}

.col {
    flex-direction: column;
}

.grid-card {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
}

.container {
    max-width: ${breakpoints.containerMaxWidth};
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items:center;
    min-height: 100%;
    height: 100%;
}

.relative {
    display: flex;
    width: ${breakpoints.containerMaxWidth};
    @media (max-width: ${breakpoints.tablet}) {
        position: relative;
    }
}
`;
