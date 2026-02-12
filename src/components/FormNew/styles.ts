import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

export const ContainerDetails = styled.div`
  background-color: ${colors.defaultBackgroundColor};
  width: 450px;

  p {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }

  form {
    padding: 0;

    &.is-editing {
      input {
        background-color: ${colors.lighterGray};
        border: 1px solid ${colors.lightGray};
      }
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }

  .button-container {
    display: flex;
    gap: 10px;
  }
`;

export const NewSection = styled.section`
  background-color: ${colors.defaultBackgroundColor};
  border-radius: 16px;
  transition: height ease 0.3s;
  max-width: 100%;
  width: 450px;
  position: relative;

  span {
    &:hover {
      opacity: 0.6;
    }
  }

  .items,
  .all-items {
    padding: 16px 0;
    width: 100%;
    display: flex;
    gap: 8px;
    justify-content: space-between;

    button {
      border-radius: 50%;
      width: 36px;
      height: 36px;
    }

    .all-items {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      position: absolute;
      top: 0;
      left: 0;
      width: auto;
      padding: 16px;
      border-radius: 16px;
      z-index: 1;
      background-color: ${colors.lighterGray};

      opacity: 0;
      pointer-events: none;
      transform: translateY(-8px);
      transition:
        opacity 0.25s ease,
        transform 0.25s ease,
        visibility 0.25s ease;
      visibility: hidden;

      &.is-visible {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
        visibility: visible;
      }
    }
  }

  .items {
    position: relative;
    height: 68px;
  }

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

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;

    .flex {
      padding: 0;
    }

    p {
      font-size: 20px;
      font-weight: bold;
    }

    .label {
      font-size: 14px;
      font-weight: normal;
      align-self: self-start;
    }

    button {
      max-width: 44px;
      margin: 0;
      color: ${colors.preto};
      align-self: self-end;
    }

    &.column {
      flex-direction: column;
    }
  }

  .padding {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 24px;
    height: 100%;
    justify-content: space-around;

    @media (max-width: ${breakpoints.tablet}) {
      padding: 16px;
    }
  }
`;
