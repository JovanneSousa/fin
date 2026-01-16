import { useState } from "react";
import type { BaseSeletorProps } from ".";
import ButtonPill from "../ButtonPill";
import { SeletorSection } from "./styles";
import { subtraiMeses, ultimoDiaMesAtual } from "../../Utils/Datas";

export const ComparativoSeletor = ({ filtros }: BaseSeletorProps) => {
  const [inicioPeriodo, setInicioPeriodo] = useState<Date>(new Date());
  const [fimPeriodo, setFimPeriodo] = useState<Date>(new Date());
  const [pillAtiva, setPillAtiva] = useState<string | null>("3m");
  const { aplicarPeriodoComparativo } = filtros;

  const aplicarFiltroMesesComparativo = (qtdMeses: number) => {
    const fim = ultimoDiaMesAtual();
    const inicio = subtraiMeses(fim, qtdMeses);

    setFimPeriodo(fim);
    setInicioPeriodo(inicio);

    aplicarPeriodoComparativo(qtdMeses);
    setPillAtiva(`${qtdMeses}m`);
  };

  return (
    <SeletorSection page="comparativo" positionTitle="space-between">
      <div className="container-title">
        <div className="title-mes">
          <p>
            <strong>
              {inicioPeriodo.toLocaleString("pt-BR", { month: "long" })}{" "}
            </strong>{" "}
            de {inicioPeriodo.getFullYear()} até{" "}
            <strong>
              {fimPeriodo.toLocaleString("pt-BR", { month: "long" })}
            </strong>{" "}
            de {fimPeriodo.getFullYear()}
          </p>
        </div>
      </div>
      <div className="container-pill">
        <ButtonPill
          radius={false}
          children="3 Meses"
          onClick={() => aplicarFiltroMesesComparativo(3)}
          className={pillAtiva === "3m" ? "is-active" : ""}
        />
        <ButtonPill
          radius={false}
          children="6 Meses"
          onClick={() => aplicarFiltroMesesComparativo(6)}
          className={pillAtiva === "6m" ? "is-active" : ""}
        />
        <ButtonPill
          radius={false}
          children="1 Ano"
          onClick={() => aplicarFiltroMesesComparativo(12)}
          className={pillAtiva === "12m" ? "is-active" : ""}
        />
      </div>
    </SeletorSection>
  );
};
