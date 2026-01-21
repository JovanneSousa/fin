import type { SkeletonProps } from "react-loading-skeleton";
import { CustomSkeletonStyled } from "./styles";

const SkeletonCustom = ({ altura, largura }: SkeletonProps) => {
  return <CustomSkeletonStyled altura={altura} largura={largura} />;
};

export default SkeletonCustom;
