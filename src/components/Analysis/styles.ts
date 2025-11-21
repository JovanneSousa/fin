import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

export const Analysis = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  nav {
    border-radius: 8px;
    padding: 4px;
    background-color: ${colors.lightGray};

    ul {
      display: flex;
      justify-content: space-between;

      li {
        padding: 4px 8px;
        width: 100%;
        border-radius: 8px;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        line-height: 24px;
        transition: all 0.3s ease;

        @media (max-width: ${breakpoints.tablet}) {
          font-size: 12px;
        }
      }

      .is-active {
        background-color: ${colors.branco};
        box-shadow: ${colors.shadow};
      }
    }
  }
  .container-analysis {
    display: grid;
    grid-template-columns: 0.7fr 0.3fr;
    gap: 20px;

    @media (max-width: ${breakpoints.tablet}) {
      grid-template-columns: 1fr;
    }
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
`;
