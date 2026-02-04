import { RodapeTabela } from "./styles";
import Button from "../Button";
import { colors } from "../../globalStyles";
import type { QtdRegistros } from "../../Hooks/usePaginacao";

interface RodapeProps {
  paginacao: {
    ultimaPagina: () => void;
    primeiraPagina: () => void;
    proximaPagina: () => void;
    paginaAnterior: () => void;
    changeQtdRegistros: (qtd: QtdRegistros) => void;
    estaNaPrimeiraPagina: boolean;
    estaNaUltimaPagina: boolean;
    linhas: {
      linhasTotais: number;
      linhasAtuais: {
        inicio: number;
        fim: number;
      };
    };
  };
}

const RodapeTabelas = ({ paginacao }: RodapeProps) => {
  const {
    changeQtdRegistros,
    paginaAnterior,
    primeiraPagina,
    proximaPagina,
    ultimaPagina,
    estaNaPrimeiraPagina,
    estaNaUltimaPagina,
    linhas,
  } = paginacao;

  return (
    <RodapeTabela>
      <div className="pag-wrapper">
        <div className="input-wrapper">
          <label htmlFor="row">Linhas por página</label>
          <select
            onChange={(e) =>
              changeQtdRegistros(Number(e.target.value) as QtdRegistros)
            }
            id="row"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <p>{`${linhas.linhasAtuais.inicio} - ${linhas.linhasAtuais.fim} de ${linhas.linhasTotais}`}</p>
      </div>
      <div className="flex">
        <Button
          disabled={estaNaPrimeiraPagina}
          className="prev"
          type="button"
          padding="small"
          bgColor={colors.defaultBackgroundColor}
          icon={"doubleLeft"}
          onClick={primeiraPagina}
        />
        <Button
          disabled={estaNaPrimeiraPagina}
          className="next"
          type="button"
          padding="small"
          bgColor={colors.defaultBackgroundColor}
          icon={"left"}
          onClick={paginaAnterior}
        />
        <Button
          disabled={estaNaUltimaPagina}
          className="prev"
          type="button"
          padding="small"
          bgColor={colors.defaultBackgroundColor}
          icon={"right"}
          onClick={proximaPagina}
        />
        <Button
          disabled={estaNaUltimaPagina}
          className="prev"
          type="button"
          padding="small"
          bgColor={colors.defaultBackgroundColor}
          icon={"doubleRight"}
          onClick={ultimaPagina}
        />
      </div>
    </RodapeTabela>
  );
};

export default RodapeTabelas;
