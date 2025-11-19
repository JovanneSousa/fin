import { colors } from "../../globalStyles";
import { CloseBox, HistorySection, IconBox } from "./styles";

const History = () => {
  return (
    <HistorySection>
      <p className="title-hist">Histórico de Transações</p>
      <div className="container-transacao">
        <div className="icon-hist">
          <IconBox color={colors.verde}>+</IconBox>
          <div>
            <p className="desc">Salário</p>
            <p className="cat">trabalho</p>
          </div>
        </div>
        <div className="value-hist">
          <div className="container-value">
            <p className="value"> + R$ 5.000,00</p>
            <p className="data">30/11/2025</p>
          </div>
          <CloseBox>X</CloseBox>
        </div>
      </div>
      <div className="container-transacao">
        <div className="icon-hist">
          <IconBox color={colors.verde}>+</IconBox>
          <div>
            <p className="desc">Salário</p>
            <p className="cat">trabalho</p>
          </div>
        </div>
        <div className="value-hist">
          <div className="container-value">
            <p className="value"> + R$ 5.000,00</p>
            <p className="data">30/11/2025</p>
          </div>
          <CloseBox>X</CloseBox>
        </div>
      </div>
    </HistorySection>
  );
};

export default History;
