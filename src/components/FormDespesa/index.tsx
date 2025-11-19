import { useState } from "react";
import { colors } from "../../globalStyles";
import Button from "../Button";

const FormDespesa = () => {
  const [isParcelado, setIsParcelado] = useState(false);

  return (
    <form>
      <div className="input-wrapper">
        <label htmlFor="descript">Descrição</label>
        <input id="descript" type="text" />
      </div>
      <div className="input-wrapper">
        <label htmlFor="value">Valor</label>
        <input id="value" type="number" />
      </div>
      <div className="input-wrapper">
        <label htmlFor="">Categoria</label>
        <select>
          <option>Selecione uma categoria</option>
          <option>Salario</option>
          <option>Freelance</option>
          <option>Investimento</option>
          <option>Outro</option>
        </select>
      </div>
      <div className="input-wrapper">
        <label htmlFor="date">Data</label>
        <input id="date" type="date" />
      </div>
      <div className="container-check">
        <div className="input-check">
          <input
            onChange={(e) => setIsParcelado(e.target.checked)}
            id="recurrency"
            type="checkbox"
          />
          <label htmlFor="recurrency">Despesa Parcelada</label>
        </div>
        {isParcelado && (
          <div className="parcelas">
            <label htmlFor="parc">Quantidade de parcelas</label>
            <input type="number" id="parc" />
          </div>
        )}
      </div>
      <Button
        padding="small"
        bgColor={colors.verde}
        type="submit"
        children="Adicionar Transação"
      />
    </form>
  );
};

export default FormDespesa;
