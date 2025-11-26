import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

export const SeletorSection = styled.section`
  background-color: ${colors.branco};
  padding: 24px;
  width: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;

  .title-mes {
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;

    @media (max-width: ${breakpoints.tablet}) {
      padding-bottom: 8px;
    }
  }

  .container-title {
    display: flex;
    justify-content: space-between;

    button {
      margin: 0;
    }

    @media (max-width: ${breakpoints.tablet}) {
      display: block;
    }
  }

  .container-pill {
    display: flex;
    gap: 8px;
    font-size: 14px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${colors.lightGray};

    button {
      padding: 6px 8px;

      @media (max-width: ${breakpoints.tablet}) {
        font-size: 14px;
      }
    }
  }

  .input-container {
    display: flex;
    gap: 20px;

    .input-wrapper {
      width: 100%;
    }

    @media (max-width: ${breakpoints.tablet}) {
      display: block;
    }
  }

  .input-mes {
    position: relative;
    display: inline-block;

    label {
      color: ${colors.gray};
      padding-bottom: 8px;

      @media (max-width: ${breakpoints.tablet}) {
        display: block;
      }
    }

    .icon-left {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: ${colors.gray};
    }

    select {
      background-color: ${colors.branco};
      border: 1px solid ${colors.lightGray};
      padding: 8px 0;
      padding-left: 32px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 0;

      &:focus {
        outline: 2px solid ${colors.verde};
      }

      @media (max-width: ${breakpoints.tablet}) {
        width: 100%;
      }
    }

    @media (max-width: ${breakpoints.tablet}) {
      text-align: center;
      width: 100%;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    gap: 8px;

    /* padding: 16px; */
  }
`;
