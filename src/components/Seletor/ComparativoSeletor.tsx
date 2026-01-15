import { useState } from "react";
import type { BaseSeletorProps } from ".";
import { colors } from "../../globalStyles";
import Button from "../Button";
import ButtonPill from "../ButtonPill";
import { SeletorSection } from "./styles";

export const ComparativoSeletor = ({
  aplicarMes,
  aplicarPeriodo,
  mesSelecionado,
  onNextMonth,
  onNextYear,
  onPrevMonth,
  onPrevYear,
  onSelectMonth,
  pillAtiva,
  setPillAtiva,
  titlePeriod,
}: BaseSeletorProps) => {
  const filtrarMesAtual = () => {
    console.log("Chamou a função");
    aplicarMes(new Date());
    setPillAtiva("mes-atual");
  };
  const [inicioPeriodo, setInicioPeriodo] = useState<Date>(new Date());
  const [fimPeriodo, setFimPeriodo] = useState<Date>(new Date());

  const filtrarIntervaloMeses = (qtd: number) => {
    setFimPeriodo(new Date());
    setInicioPeriodo(
      new Date(fimPeriodo.getFullYear(), fimPeriodo.getMonth() - qtd, 1)
    );
    aplicarPeriodo(inicioPeriodo, fimPeriodo);
    setPillAtiva(`${qtd}m`);
  };

  const gerarMesesSelect = () => {
    const meses = [];
    const hoje = new Date();

    for (let i = 1; i <= 6; i++) {
      const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);

      meses.push({
        label: data.toLocaleString("pt-BR", { month: "long", year: "numeric" }),
        year: data.getFullYear(),
        month: data.getMonth(),
      });
    }

    for (let i = 1; i <= 6; i++) {
      const data = new Date(hoje.getFullYear(), hoje.getMonth() + i, 1);

      meses.push({
        label: data.toLocaleString("pt-BR", { month: "long", year: "numeric" }),
        year: data.getFullYear(),
        month: data.getMonth(),
      });
    }

    return meses;
  };

  const meses = gerarMesesSelect();
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
          children="3 Meses"
          onClick={() => filtrarIntervaloMeses(3)}
          className={pillAtiva === "3m" ? "is-active" : ""}
        />
        <ButtonPill
          children="6 Meses"
          onClick={() => filtrarIntervaloMeses(6)}
          className={pillAtiva === "6m" ? "is-active" : ""}
        />
        <ButtonPill
          children="1 Ano"
          onClick={() => filtrarIntervaloMeses(12)}
          className={pillAtiva === "12m" ? "is-active" : ""}
        />
      </div>
    </SeletorSection>
  );
};
