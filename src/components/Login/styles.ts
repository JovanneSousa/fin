import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

export const LoginSection = styled.section`
  background-color: ${colors.defaultBackgroundColor};
  padding: 110px 90px 33px;
  border-radius: 16px;
  display: flex;
  gap: 44px;
  height: 650px;
  
  button {
    margin-top: 0;
  }

  .img {
    perspective: 600px;
    display: inline-block;
    img {
      margin: 50px auto;
      width: 300px;
      transition: transform 0.5s ease;
      will-change: transform;
    }

    &:hover img {
      transform: rotateX(10deg) rotateY(10deg);
    }
  }

  .input-wrapper {
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
  }

  .create {
    text-align: center;
    width: 100%;
    display: block;
    color: ${colors.gray};
    cursor: pointer;
    border: none;
    background-color: ${colors.defaultBackgroundColor};
    margin-top: 8px;

    &:hover {
      color: ${colors.verde};
    }
  }

  .form {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .title {
      font-size: 32px;
      display: block;
      text-align: center;
      padding-bottom: 54px;
      font-weight: bold;
    }

    form {
      display: flex;
      flex-direction: column;

      span {
        color: ${colors.vermelho};
        margin: 0 6px 6px;
        height: 8px;
        font-size: 12px;
      }

      input {
        padding: 16px 48px;
        font-size: 16px;
        border: none;
        outline: none;
        border-radius: 32px;
        background-color: ${colors.lightGray};
        color: ${colors.gray};
        font-weight: 500;
        width: 100%;
        transition: box-shadow 0.5s ease;

        &:focus {
          box-shadow: 0 0 12px ${colors.verde};
        }

        &:focus + i {
          color: ${colors.verde};
        }
      }
    }

    @media (min-width: ${breakpoints.tablet}) {
      min-width: 400px;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    padding: 110px 16px 33px;

    .img {
      display: none;
    }
  }

  .login-visit {
    position: absolute;
    max-width: 375px;
    bottom: 20px;
    right: 20px;
  }
`;
