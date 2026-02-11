import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

export const FilterContainer = styled.div`
  background-color: ${colors.defaultBackgroundColor};
  padding: 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 500px;

  p {
    font-size: 18px;
    font-weight: bold;
    color: ${colors.darkGray};
  }

  button {
    margin-top: 8px;
    width: 100%;
  }

  .filtros {
    display: flex;
    justify-content: space-around;
    gap: 8px;
  }

  .container-title-filter {
    display: flex;
    justify-content: space-between;

    button {
      margin: 0;
      max-width: 40px;
    }
  }

  .container-cat-filter {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    scrollbar-width: thin;
    scrollbar-color: ${colors.verde} ${colors.lighterGray};

    @media (max-width: ${breakpoints.tablet}) {
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 50px;
      max-height: calc(50px * 4 + 8px * 3);
      overflow-y: auto;
    }
  }

  .container-recorrencia {
    display: flex;
    gap: 32px;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    
    button {
      width: 100%;
      margin: 0;
    }
  }

  .container-ord {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    .buttons {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
  }

  .buttons-container {
    display: flex;
    gap: 20px;
    width: 100%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    gap: 10px;
    min-width: auto;
  }
`;
