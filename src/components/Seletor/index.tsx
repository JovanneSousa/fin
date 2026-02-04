import SeletorTransacao from "./SeletorTransacao";
import { ComparativoSeletor } from "./ComparativoSeletor";
import useTransactions from "../../Hooks/useTransactions";

export type BaseSeletorProps = {
  mesSelecionado: Date;

  handle: {
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onPrevYear: () => void;
    onNextYear: () => void;
  };

  filtros: {
    onSelectMonth: (month: number) => void;
    aplicarPeriodoComparativo: (qtdMeses: number) => void;
  };

  // aplicarMes: (date: Date) => void;
};

interface SeletorProps {
  page: string;
}

const Seletor = ({ page }: SeletorProps) => {
  const seletor = useTransactions();

  if (page == "transacoes") return <SeletorTransacao {...seletor} />;

  if (page == "comparativo") return <ComparativoSeletor {...seletor} />;

  // return <DefaultSeletor {...seletor} />;
};

export default Seletor;
