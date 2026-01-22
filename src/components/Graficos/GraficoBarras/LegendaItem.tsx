import "react-loading-skeleton/dist/skeleton.css";
import { LegendItemStyled } from "./styles";
import { formatCurrency } from "../../../Utils";
import SkeletonCustom from "../../SkeletonCustom";

type LegendItemProps = {
  label: string;
  value?: number;
  loading?: boolean;
  className?: string;
};

const LegendaItem = ({ label, loading, value, className }: LegendItemProps) => {
  return (
    <LegendItemStyled>
      <p>{label}</p>
      <p className={className}>
        {loading ? <SkeletonCustom /> : formatCurrency(value ?? 0)}
      </p>
    </LegendItemStyled>
  );
};

export default LegendaItem;
