import styled, { css } from "styled-components";
import { colors } from "../../globalStyles";
import type { FormularioProps } from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconProps {
  size: "small" | "default";
}

const iconPosition = {
  small: css`
    left: 12px;
    top: 55%;
  `,
  default: css`
    left: 24px;
    top: 40%;
  `,
};

const estilos = {
  default: css`
    input,
    select,
    .input-span {
      padding: 16px 48px;
      border-radius: 32px;
    }
  `,
  small: css`
    input,
    select,
    .input-span {
      padding: 12px 40px;
      border-radius: 16px;
    }
  `,
};

export const StyledIconForm = styled(FontAwesomeIcon).withConfig({
  shouldForwardProp: (props) => !["size"].includes(props),
})<IconProps>`
  position: absolute;
  transform: translateY(-50%);
  color: ${colors.gray};
  font-size: 16px;
  transition: color 0.5s ease;

  ${({ size }) => iconPosition[size]}
`;

export const StyledForm = styled.form.withConfig({
  shouldForwardProp: (props) => !["size"].includes(props),
})<FormularioProps>`
  padding: 8px;
  ${({ size }) => estilos[size]}

  .input-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
    position: relative;

    i {
      position: absolute;
      left: 24px;
      top: 40%;
      transform: translateY(-50%);
      color: ${colors.gray};
      font-size: 16px;
      transition: color 0.5s ease;
    }

    span {
      color: ${colors.vermelho};
      margin: 0 6px 6px;
      height: 8px;
      font-size: 12px;
    }
  }

  label {
    padding-bottom: 8px;
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 10px;
    cursor: pointer;
  }

  input,
  select,
  .input-span {
    font-size: 16px;
    border: none;
    outline: none;
    background-color: ${colors.lightGray};
    color: ${colors.gray};
    font-weight: 500;
    width: 100%;
    transition: box-shadow 0.5s ease;

    &:focus {
      box-shadow: 0 0 12px ${colors.verde};
    }

    &:focus + i,
    &:focus + svg {
      color: ${colors.verde};
    }
  }

  select {
    appearance: none;
  }

  .input-check,
  .container-check {
    label {
      padding: 0;
    }
    input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }
    display: flex;
    align-items: center;
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
    overflow: hidden;
    display: block;
    max-height: 50px;
    transition: max-height ease 0.3s;

    &.open {
      max-height: 140px;
    }

    & > .input-check {
      padding-left: 0;
      margin-top: 0;
    }
    .parcelas {
      margin-top: 8px;
      visibility: hidden;

      &.open {
        visibility: visible;
      }
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
