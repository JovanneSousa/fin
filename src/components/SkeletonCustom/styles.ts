import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

export interface SkeletonProps {
  altura?: string;
  largura?: string;
}

export const CustomSkeletonStyled = styled(Skeleton).withConfig({
  shouldForwardProp: (props) => !["altura", "largura"].includes(props),
})<SkeletonProps>`
  width: ${({ largura }) => (largura ? largura : "100%")};
  height: ${({ altura }) => (altura ? altura : "100%")};
  display: block;
`;
