import "react-loading-skeleton/dist/skeleton.css";
import { CustomSkeleton } from "../../globalStyles";

type Props = {
  columns: number;
};

export function TableSkeletonRow({ columns }: Props) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index}>
          <CustomSkeleton altura="18px" />
        </td>
      ))}
    </tr>
  );
}
