import styled from "styled-components";
import { breakpoints, colors } from "../../globalStyles";

type DashboardsProp = {
  isComparison?: boolean;
};

export const DashboardsSection = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isComparison"].includes(prop),
})<DashboardsProp>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .container-analysis {
    display: grid;
    grid-template-columns: 1fr 1fr;

    grid-template-areas:
      "a b"
      "c c";
    gap: 16px;

    @media (max-width: ${breakpoints.tablet}) {
      grid-template-columns: 1fr;
    }
  }

  .conteudo {
    background-color: ${colors.branco};
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;

    &.mh-50 {
      max-height: 500px;
    }
  }

  .title-container {
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media (max-width: ${breakpoints.tablet}) {
      flex-direction: column;
      gap: 8px;
    }
  }

  .content {
    @media (max-width: ${breakpoints.tablet}) {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.5s ease;

      &.is-active {
        max-height: 500px;
      }
    }
  }
`;
