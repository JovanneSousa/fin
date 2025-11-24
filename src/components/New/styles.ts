import styled from "styled-components";
import { colors } from "../../globalStyles";

export const NewSection = styled.section`
  background-color: ${colors.branco};
  border-radius: 16px;

  .type {
    margin: 16px 0;
  }

  label {
    font-size: 14px;
  }

  .button-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .padding {
    box-sizing: border-box;
    padding: 24px;
  }

  .new-title {
    font-size: 24px;
    font-weight: bold;
  }

  form {
    .input-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
    }

    input,
    select {
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

  span {
    color: ${colors.vermelho};
    margin: 0 6px 6px;
    height: 8px;
    font-size: 12px;
  }
`;
