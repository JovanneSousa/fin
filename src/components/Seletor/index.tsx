import ButtonPill from "../ButtonPill";
import { SeletorSection } from "./styles";

const Seletor = () => {
  return (
    <SeletorSection>
      <div className="container-title">
        <ButtonPill children="Anterior" />
        <ButtonPill children="Próximo" />
      </div>
      <div className="title-mes">
        <h3>Novembro de 2025</h3>
        <p>Filtrando Transações por período</p>
      </div>
      <div className="input-mes">
        <label htmlFor="mes">Selecionar mês com registro: </label>
        <select name="" id="mes">
          <option value="A">Novembro de 2025</option>
          <option value="B">Novembro de 2025</option>
          <option value="C">Novembro de 2025</option>
          <option value="D">Novembro de 2025</option>
        </select>
      </div>
    </SeletorSection>
  );
};

export default Seletor;
