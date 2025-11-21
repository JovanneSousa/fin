import styled from "styled-components";
import { colors } from "../../globalStyles";
import { hexToRgb } from "../../Utils";

export const ContainerListCat = styled.div`
  padding: 24px;
  background-color: ${colors.branco};
  border-radius: 16px;

  .container-title-categories {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bold;
    align-items: center;
    padding-bottom: 16px;

    button {
      max-width: 25%;
    }

  }

  .remove-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    transition: color 0.2s ease-in-out;
  }

  .container-lista-categoria {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    max-width: 640px;

    .tag {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: rgba(${hexToRgb(colors.verde)}, 0.2);
      color: ${colors.verde};
      padding: 8px 12px;
      font-size: 14px;
      border-radius: 8px;
      flex: 0 1 auto;

      .remove-btn:hover {
        color: ${colors.vermelho};
      }

      .icon {
        width: 1rem;
        height: 1rem;
      }
    }
  }

  p {
    padding: 8px;
  }

  .receita-list,
  .despesa-list {
    border-top: 2px solid ${colors.lightGray};
    padding: 8px;
  }

  .receita-list {
    p {
      color: ${colors.verde};
    }
  }

  .despesa-list {
    p {
      color: ${colors.vermelho};
    }
  }
`;
