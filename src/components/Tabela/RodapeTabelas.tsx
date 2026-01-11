import { RodapeTabela } from "./styles";
import Button from "../Button";
import { colors } from "../../globalStyles";

const RodapeTabelas = () => {
  return (
    <RodapeTabela>
      <form>
        <div className="input-wrapper">
          <label htmlFor="row">Linhas por página</label>
          <select id="row">
            <option value="">5</option>
            <option value="">10</option>
            <option value="">25</option>
            <option value="">50</option>
          </select>
        </div>
      </form>
      <p>1-5 de 6</p>
      <div>
        <Button
          className="prev"
          type="button"
          padding="small"
          bgColor={colors.branco}
          icon={"doubleLeft"}
        />
        <Button
          className="next"
          type="button"
          padding="small"
          bgColor={colors.branco}
          icon={"left"}
        />
        <Button
          className="prev"
          type="button"
          padding="small"
          bgColor={colors.branco}
          icon={"right"}
        />
        <Button
          className="prev"
          type="button"
          padding="small"
          bgColor={colors.branco}
          icon={"doubleRight"}
        />
      </div>
    </RodapeTabela>
  );
};

export default RodapeTabelas;
