import { useState } from "react";
import type { BaseSeletorProps } from ".";
import ButtonPill from "../ButtonPill";
import { SeletorSection } from "./styles";

export const ComparativoSeletor = ({
  aplicarPeriodo,
  pillAtiva,
  setPillAtiva,
}: BaseSeletorProps) => {
  const [inicioPeriodo, setInicioPeriodo] = useState<Date>(new Date());
  const [fimPeriodo, setFimPeriodo] = useState<Date>(new Date());

  const filtrarIntervaloMeses = async (qtd: number) => {
    //pega o ultimo dia do mês
    const novoFim = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );
    const novoInicio = new Date(
      novoFim.getFullYear(),
      novoFim.getMonth() - (qtd - 1),
      1
    );

    setFimPeriodo(novoFim);
    setInicioPeriodo(novoInicio);

    aplicarPeriodo(novoInicio, novoFim);
    setPillAtiva(`${qtd}m`);
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
          onClick={() => filtrarIntervaloMeses(3)}
          className={pillAtiva === "3m" ? "is-active" : ""}
        />
        <ButtonPill
          radius={false}
          children="6 Meses"
          onClick={() => filtrarIntervaloMeses(6)}
          className={pillAtiva === "6m" ? "is-active" : ""}
        />
        <ButtonPill
          radius={false}
          children="1 Ano"
          onClick={() => filtrarIntervaloMeses(12)}
          className={pillAtiva === "12m" ? "is-active" : ""}
        />
      </div>
    </SeletorSection>
  );
};
