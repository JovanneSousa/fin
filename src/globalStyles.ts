import { createGlobalStyle } from "styled-components";

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
  vermelho: "#e63946"
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

.main {
    width: 100%;
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
    gap: 20px;
    margin-bottom: 24px;

    @media (max-width: ${breakpoints.tablet}) {
        grid-template-columns: 1fr;
    }
}

.container {
    max-width: ${breakpoints.containerMaxWidth};
    margin: 0 auto;
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
`;
