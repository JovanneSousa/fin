import { useEffect } from "react";
import { colors } from "../../globalStyles";
import {
  CloseBox,
  DetailBox,
  EditBox,
  HistorySection,
  IconBox,
} from "./styles";
import { fetchTransactions } from "../../Store/reducers/transactions";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootReducer } from "../../Store";
import Loader from "../Loader";
import Feedback from "../Feedback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faCircleInfo, faPen } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from "../../Utils";

const History = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootReducer) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  return (
    <HistorySection>
      <p className="title-hist">Histórico de Transações</p>

      {loading ? (
        <Loader />
      ) : error ? (
        <Feedback noButton={true} error={error} />
      ) : (
        items.map((item) => (
          <div className="container-transacao" key={item.id}>
            <div className="icon-hist">
              <IconBox color={colors.verde}>+</IconBox>
              <div className="container-titulo-nome">
                <p className="desc">{item.titulo}</p>
                <p className="cat">{item.categoria?.name}</p>
              </div>
            </div>
            <div className="value-hist">
              <div className="container-value">
                <p className="value">
                  <p className="value">
                    {item.type === 0
                      ? `+ ${formatCurrency(item.valor)}`
                      : `- ${formatCurrency(item.valor)}`}
                  </p>
                </p>
                <p className="data">
                  {" "}
                  {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="button-container">
                <DetailBox>
                  <FontAwesomeIcon icon={faCircleInfo} size="lg" />
                </DetailBox>
                <EditBox>
                  <FontAwesomeIcon icon={faPen} size="lg" />
                </EditBox>
                <CloseBox>
                  <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                </CloseBox>
              </div>
            </div>
          </div>
        ))
      )}
    </HistorySection>
  );
};

export default History;
