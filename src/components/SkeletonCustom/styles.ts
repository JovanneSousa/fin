import styled from "styled-components";

export interface SkeletonProps {
  altura?: string;
  largura?: string;
  circle?: boolean;
  className?: string;
}

export const SkeletonWrapper = styled.div.withConfig({
  shouldForwardProp: (props) => !["altura", "largura"].includes(props),
})<SkeletonProps>`
  width: ${({ largura }) => (largura ? largura : "100%")};
  height: ${({ altura }) => (altura ? altura : "100%")};
  span {
    width: ${({ largura }) => (largura ? largura : "100%")};
    height: ${({ altura }) => (altura ? altura : "100%")};
  }
`;
