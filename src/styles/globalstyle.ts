import { createGlobalStyle } from "styled-components";
import { breakpoints } from "./utilStyles";
import { colors } from "./cores";

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

  @media (max-width: ${breakpoints.tablet}) {
    padding-bottom: 64px;
  }
}

#root {
    min-height: 100vh;
    display: flex;
}

body {
    background: ${({ theme }) => theme.shiningGray};
    background-repeat: no-repeat;
    min-height: 100vh;
    position: relative;
    background-size: cover;
    color: ${({ theme }) => theme.textColor};
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

form, .pag-wrapper, div {
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
      background-color: ${({ theme }) => theme.lightGray};
      color: ${({ theme }) => theme.gray};
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

  .feedback-container {
    position: absolute;
      inset: 0;
      background-color: ${({ theme }) => theme.defaultBackgroundColor};
      pointer-events: "none";
      z-index: 2;
      justify-content: space-between;
      gap: 16px;
        border-radius: 16px;
  }
`;
