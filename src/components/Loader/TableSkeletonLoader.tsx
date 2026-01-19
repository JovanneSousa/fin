import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  columns: number;
};

export function TableSkeletonRow({ columns }: Props) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index}>
          <Skeleton height={18} />
        </td>
      ))}
    </tr>
  );
}
