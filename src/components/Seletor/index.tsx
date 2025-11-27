import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../../globalStyles";
import Button from "../Button";
import { SeletorSection } from "./styles";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import ButtonPill from "../ButtonPill";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../Store";
import {
  fetchTransactionsPeriod,
  type TransactionFilter,
} from "../../Store/reducers/transactions";

const Seletor = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isFilterPeriodoActive, setIsFilterPeriodoActive] = useState(false);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [mesSelecionado, setMesSelecionado] = useState(new Date());
  const [pillAtiva, setPillAtiva] = useState<null | string>("mes-atual");
  const [titlePeriod, setTitlePeriod] = useState(false);

  const isMesAtual = (date: Date) =>
    date.getMonth() === new Date().getMonth() &&
    date.getFullYear() === new Date().getFullYear();

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

  const criarFiltro = (inicio: Date, fim: Date): TransactionFilter => ({
    startDate: inicio.toISOString(),
    endDate: fim.toISOString(),
  });

  const handleMonthChange = (direction: "anterior" | "proximo") => {
    const novoMes = new Date(mesSelecionado);

    if (direction === "anterior") {
      novoMes.setMonth(novoMes.getMonth() - 1);
    } else {
      novoMes.setMonth(novoMes.getMonth() + 1);
    }
    setMesSelecionado(novoMes);
    setTitlePeriod(false);

    const inicio = new Date(novoMes.getFullYear(), novoMes.getMonth(), 1);
    const fim = new Date(novoMes.getFullYear(), novoMes.getMonth() + 1, 0);

    dispatch(fetchTransactionsPeriod(criarFiltro(inicio, fim)));

    setPillAtiva(isMesAtual(novoMes) ? "mes-atual" : null);
  };

  const handleSelectMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) return;

    const [year, month] = value.split("-").map(Number);

    const inicio = new Date(year, month, 1);
    const fim = new Date(year, month + 1, 0);

    setMesSelecionado(inicio);
    setTitlePeriod(false);

    setPillAtiva(isMesAtual(inicio) ? "mes-atual" : null);
    dispatch(fetchTransactionsPeriod(criarFiltro(inicio, fim)));
  };

  const criarFiltroMesAtual = useCallback(() => {
    const hoje = new Date();
    const inicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
    return criarFiltro(inicio, fim);
  }, []);

  const filtrarMesAtual = () => {
    const hoje = new Date();
    setMesSelecionado(hoje);
    setPillAtiva("mes-atual");
    setTitlePeriod(false);
    dispatch(fetchTransactionsPeriod(criarFiltroMesAtual()));
  };

  const filtrarIntervaloMeses = (qtd: number) => {
    const fim = new Date();
    const inicio = new Date(fim.getFullYear(), fim.getMonth() - qtd, 1);

    dispatch(fetchTransactionsPeriod(criarFiltro(inicio, fim)));
    setPillAtiva(`${qtd}m`);
    setTitlePeriod(false);
    setMesSelecionado(fim);
  };

  const aplicarFiltroPeriodo = (e: React.FormEvent) => {
    e.preventDefault();

    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    setTitlePeriod(true);
    setIsFilterPeriodoActive(false);
    setPillAtiva(null);
    dispatch(fetchTransactionsPeriod(criarFiltro(inicio, fim)));
  };

  useEffect(() => {
    dispatch(fetchTransactionsPeriod(criarFiltroMesAtual()));
  }, [criarFiltroMesAtual, dispatch]);

  const meses = gerarMesesSelect();

  return (
    <SeletorSection>
      <div className="container-title">
        <div className="title-mes">
          <Button
            padding="small"
            bgColor={colors.lightGray}
            type="button"
            children=""
            icon="left"
            onClick={() => handleMonthChange("anterior")}
          />
          <p>
            {titlePeriod
              ? "Filtro por periodo"
              : `${mesSelecionado.toLocaleString("pt-BR", { month: "long" })} de
              ${mesSelecionado.getFullYear()}`}
          </p>
          <Button
            padding="small"
            bgColor={colors.lightGray}
            type="button"
            children=""
            icon="right"
            onClick={() => handleMonthChange("proximo")}
          />
        </div>
        <div className="input-mes">
          <FontAwesomeIcon icon={faCalendar} className="icon-left" />
          <select onChange={handleSelectMonth} id="mes">
            <option value="">Selecionar mês</option>
            {meses
              .sort((a, b) => b.year - a.year || b.month - a.month)
              .map((m) => (
                <option
                  key={`${m.year} - ${m.month}`}
                  value={`${m.year}-${m.month}`}
                >
                  {m.label}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="container-pill">
        <ButtonPill
          className={pillAtiva === "mes-atual" ? "is-active" : ""}
          children="Mês Atual"
          onClick={filtrarMesAtual}
        />
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
      {!isFilterPeriodoActive ? (
        <Button
          onClick={() => setIsFilterPeriodoActive(true)}
          bgColor={colors.lightGray}
          padding="small"
          type="button"
          children="Filtrar por período"
        />
      ) : (
        <Button
          onClick={() => setIsFilterPeriodoActive(false)}
          bgColor={colors.lightGray}
          padding="small"
          type="button"
          children="Fechar Filtro"
        />
      )}

      {isFilterPeriodoActive ? (
        <>
          <form onSubmit={aplicarFiltroPeriodo}>
            <div className="input-container">
              <div className="input-wrapper">
                <label htmlFor="date">Data Inicial</label>
                <input
                  id="date"
                  type="date"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="date">Data Final</label>
                <input
                  id="date"
                  type="date"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                />
              </div>
            </div>
            <Button
              bgColor={colors.verde}
              padding="small"
              type="submit"
              children="Aplicar Período"
            />
          </form>
        </>
      ) : null}
    </SeletorSection>
  );
};

export default Seletor;
