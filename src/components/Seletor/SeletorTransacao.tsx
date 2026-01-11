import { useState } from "react";
import type { BaseSeletorProps } from ".";
import { SeletorSection } from "./styles";
import Button from "../Button";
import { colors } from "../../globalStyles";
import ButtonPill from "../ButtonPill";

const MESES = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const SeletorTransacao = ({
  mesSelecionado,
  titlePeriod,
  onPrevMonth,
  onNextMonth,
  onPrevYear,
  onNextYear,
  onSelectMonth,
}: BaseSeletorProps) => {
  const [isSelecting, setIsSelecting] = useState(false);

  return (
    <SeletorSection
      isSelecting={isSelecting}
      page="transacoes"
      positionTitle="center"
    >
      <div className="title-mes">
        <Button
          className="prev"
          padding="small"
          type="button"
          icon="left"
          bgColor={colors.lightGray}
          onClick={isSelecting ? onPrevYear : onPrevMonth}
        />

        <p onClick={() => setIsSelecting(!isSelecting)}>
          {titlePeriod ? (
            "Filtro por período"
          ) : isSelecting ? (
            mesSelecionado.getFullYear()
          ) : (
            <>
              <strong>
                {mesSelecionado.toLocaleString("pt-BR", { month: "long" })}
              </strong>{" "}
              de {mesSelecionado.getFullYear()}
            </>
          )}
        </p>

        <Button
          className="next"
          padding="small"
          type="button"
          icon="right"
          bgColor={colors.lightGray}
          onClick={isSelecting ? onNextYear : onNextMonth}
        />
      </div>
      <div className="month-container">
        {MESES.map((m, i) => (
          <ButtonPill
            className="months"
            key={m}
            onClick={() => {
              onSelectMonth(i);
              setIsSelecting(false);
            }}
          >
            {m}
          </ButtonPill>
        ))}
      </div>
    </SeletorSection>
  );
};

export default SeletorTransacao;
