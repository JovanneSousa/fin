import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../../globalStyles";
import Button from "../Button";
import { SeletorSection } from "./styles";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import ButtonPill from "../ButtonPill";
import { useEffect, useState } from "react";
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

  const handleMonthChange = (direction: "anterior" | "proximo") => {
    const novoMes = new Date(mesSelecionado);

    if (direction === "anterior") {
      novoMes.setMonth(novoMes.getMonth() - 1);
    } else {
      novoMes.setMonth(novoMes.getMonth() + 1);
    }

    setMesSelecionado(novoMes);

    const data: TransactionFilter = {
      startDate: new Date(
        novoMes.getFullYear(),
        novoMes.getMonth(),
        1
      ).toISOString(),
      endDate: new Date(
        novoMes.getFullYear(),
        novoMes.getMonth() + 1,
        0
      ).toISOString(),
    };

    dispatch(fetchTransactionsPeriod(data));
  };

  const filtrarMesAtual = () => {
    const hoje = new Date();

    const data: TransactionFilter = {
      startDate: new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString(),

      endDate: new Date(
        hoje.getFullYear(),
        hoje.getMonth() + 1,
        0
      ).toISOString(),
    };

    dispatch(fetchTransactionsPeriod(data));
  };

  const filtrarIntervaloMeses = (qtd: number) => {
    const inicio = new Date();
    inicio.setMonth(inicio.getMonth() - qtd);

    const data: TransactionFilter = {
      startDate: inicio.toISOString(),
      endDate: new Date().toISOString(),
    };

    dispatch(fetchTransactionsPeriod(data));
  };

  const aplicarFiltroPeriodo = (e: React.FormEvent) => {
    e.preventDefault();

    const data: TransactionFilter = {
      startDate: new Date(dataInicio).toISOString(),
      endDate: new Date(dataFim).toISOString(),
    };

    dispatch(fetchTransactionsPeriod(data));
  };

  useEffect(() => {
    filtrarMesAtual();
  }, []);

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
            {mesSelecionado.toLocaleString("pt-BR", { month: "long" })} de{" "}
            {mesSelecionado.getFullYear()}
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
          <select id="mes">
            <option value="">Selecionar mês</option>
            <option value="A">Novembro de 2025</option>
            <option value="B">Novembro de 2025</option>
            <option value="C">Novembro de 2025</option>
            <option value="D">Novembro de 2025</option>
          </select>
        </div>
      </div>
      <div className="container-pill">
        <ButtonPill
          className={pillAtiva === "mes-atual" ? "is-active" : ""}
          children="Mês Atual"
          onClick={() => {
            filtrarMesAtual();
            setPillAtiva("mes-atual");
          }}
        />
        <ButtonPill
          children="3 Meses"
          onClick={() => {
            filtrarIntervaloMeses(3);
            setPillAtiva("3m");
          }}
          className={pillAtiva === "3m" ? "is-active" : ""}
        />
        <ButtonPill
          children="6 Meses"
          onClick={() => {
            filtrarIntervaloMeses(6);
            setPillAtiva("6m");
          }}
          className={pillAtiva === "6m" ? "is-active" : ""}
        />
        <ButtonPill
          children="1 Ano"
          onClick={() => {
            filtrarIntervaloMeses(12);
            setPillAtiva("12m");
          }}
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
