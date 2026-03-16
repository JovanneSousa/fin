import { useState } from "react";
import type { BaseSeletorProps } from ".";
import { SeletorSection } from "./styles";
import Button from "../Button";
import ButtonPill from "../ButtonPill";
import { useTheme } from "styled-components";

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
  handle,
  filtros,
}: BaseSeletorProps) => {
  const theme = useTheme();
  const [isSelecting, setIsSelecting] = useState(false);

  const { onNextMonth, onNextYear, onPrevMonth, onPrevYear } = handle;
  const { onSelectMonth } = filtros;

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
          bgColor={theme.lightGray}
          onClick={isSelecting ? onPrevYear : onPrevMonth}
        />

        <p onClick={() => setIsSelecting(!isSelecting)}>
          {isSelecting ? (
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
          bgColor={theme.lightGray}
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
