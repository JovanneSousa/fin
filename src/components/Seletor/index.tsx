import SeletorTransacao from "./SeletorTransacao";
import DefaultSeletor from "./DefaultSeletor";
import { useTransactionDateFilter } from "../../Hooks/useTransactionDateFilter";

export type BaseSeletorProps = {
  mesSelecionado: Date;
  titlePeriod: boolean;
  pillAtiva: string | null;

  onPrevMonth: () => void;
  onNextMonth: () => void;

  onPrevYear: () => void;
  onNextYear: () => void;

  onSelectMonth: (monthIndex: number) => void;
  aplicarPeriodo: (inicio: Date, fim: Date) => void;
  aplicarMes: (date: Date) => void;

  setPillAtiva: (value: string | null) => void;
};

interface SeletorProps {
  page: string;
}

const Seletor = ({ page }: SeletorProps) => {
  
  const seletor = useTransactionDateFilter();

  if (page == "transacoes") return <SeletorTransacao {...seletor} />;

  return <DefaultSeletor {...seletor} />;
};

export default Seletor;
