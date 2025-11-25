import { useEffect, useState } from "react";
import { colors } from "../../globalStyles";
import { CloseBox, DetailBox, HistorySection, IconBox } from "./styles";
import {
  deleteTransactions,
  fetchTransactions,
  getTransacao,
} from "../../Store/reducers/transactions";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootReducer } from "../../Store";
import Loader from "../Loader";
import Feedback from "../Feedback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from "../../Utils";
import Modal from "../ModalContainer";
import TransacaoDetails from "../TransactionDetails";

const History = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {
    items,
    loadingGet,
    errorGet,
    loadingDelete,
    errorDelete,
    successDelete,
  } = useSelector((state: RootReducer) => state.transactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  return (
    <HistorySection>
      <p className="title-hist">Histórico de Transações</p>

      {loadingGet || loadingDelete ? (
        <Loader />
      ) : errorGet ? (
        <Feedback noButton={true} error={errorGet} />
      ) : errorDelete ? (
        <Feedback error={errorDelete} />
      ) : successDelete ? (
        <Feedback success={successDelete} />
      ) : items.length === 0 ? (
        <Feedback success="Busca realizada com sucesso, mas nenhum item foi encontrado" noButton={true}/>
      ) : (
        items
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((item) => (
            <div className="container-transacao" key={item.id}>
              <div className="icon-hist">
                <IconBox
                  color={item.type === 0 ? colors.verde : colors.vermelho}
                >
                  {item.type === 0 ? "+" : "-"}
                </IconBox>
                <div className="container-titulo-nome">
                  <p className="desc">{item.titulo}</p>
                  <p className="cat">{item.categoria?.name}</p>
                </div>
              </div>
              <div className="value-hist">
                <div className="container-value">
                  <p className={`value ${item.type === 1 ? "despesa" : ""}`}>
                    {item.type === 0
                      ? `+ ${formatCurrency(item.valor)}`
                      : `- ${formatCurrency(item.valor)}`}
                  </p>
                  <p className="data">
                    {" "}
                    {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="button-container">
                  <DetailBox
                    onClick={() => {
                      dispatch(getTransacao(item.id!));
                      setIsOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faCircleInfo} size="lg" />
                  </DetailBox>
                  <CloseBox
                    onClick={() => dispatch(deleteTransactions(item.id!))}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                  </CloseBox>
                </div>
              </div>
            </div>
          ))
      )}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <TransacaoDetails onClose={() => setIsOpen(false)} />
      </Modal>
    </HistorySection>
  );
};

export default History;
