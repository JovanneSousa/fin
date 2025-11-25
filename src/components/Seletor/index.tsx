import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../../globalStyles";
import Button from "../Button";
import { SeletorSection } from "./styles";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import ButtonPill from "../ButtonPill";
import { useState } from "react";

const Seletor = () => {
  const [isFilterPeriodoActive, setIsFilterPeriodoActive] = useState(false);

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
          />
          <p>Novembro de 2025</p>
          <Button
            padding="small"
            bgColor={colors.lightGray}
            type="button"
            children=""
            icon="right"
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
        <ButtonPill className="is-active" children="Mês Atual" />
        <ButtonPill children="3 Meses" />
        <ButtonPill children="6 Meses" />
        <ButtonPill children="1 Ano" />
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
          <form>
            <div className="input-container">
              <div className="input-wrapper">
                <label htmlFor="date">Data Inicial</label>
                <input id="date" type="date" />
              </div>
              <div className="input-wrapper">
                <label htmlFor="date">Data Final</label>
                <input id="date" type="date" />
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
