import { colors } from "../../globalStyles";
import Button from "../Button";

const FormCategoria = () => {
  return (
    <>
      <form>
        <div className="input-wrapper">
          <label htmlFor="categoria-desp">Tipo</label>
          <select id="categoria-desp">
            <option>Receita</option>
            <option>Despesa</option>
          </select>
        </div>
        <div className="input-wrapper">
          <label htmlFor="cat-name">Nome da Categoria</label>
          <input id="cat-name" type="text" />
        </div>
        <Button
          padding="small"
          bgColor={colors.verde}
          type="submit"
          children="Adicionar Categoria"
        />
      </form>
      <Button
        type="button"
        bgColor={colors.azul}
        padding="small"
        children="Listar Categorias"
      />
    </>
  );
};

export default FormCategoria;
