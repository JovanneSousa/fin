import Skeleton from "react-loading-skeleton";
import { SkeletonWrapper, type SkeletonProps } from "./styles";

const SkeletonCustom = ({
  altura,
  largura,
  circle,
  className,
}: SkeletonProps) => {
  return (
    <SkeletonWrapper altura={altura} largura={largura}>
      <Skeleton circle={circle} className={className} />
    </SkeletonWrapper>
  );
};

export default SkeletonCustom;
