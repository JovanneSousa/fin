import "react-loading-skeleton/dist/skeleton.css";
import SkeletonCustom from "../SkeletonCustom";

type Props = {
  columns: number;
};

export function TableSkeletonRow({ columns }: Props) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index}>
          <SkeletonCustom altura="18px" />
        </td>
      ))}
    </tr>
  );
}
