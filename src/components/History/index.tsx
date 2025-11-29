import { useState } from "react";
import { colors } from "../../globalStyles";
import { CloseBox, DetailBox, HistorySection, IconBox } from "./styles";
import {
  getTransacao,
  type Transacao,
} from "../../Store/reducers/transactions";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootReducer } from "../../Store";
import Loader from "../Loader";
import Feedback from "../Feedback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency, toLocalDateIgnoreTimezone } from "../../Utils";
import Modal from "../ModalContainer";
import TransacaoDetails from "../TransactionDetails";
import Button from "../Button";
import FilterHistory from "../FilterHistory";
import Delete from "../Delete";

interface Filters {
  type: string;
  categories: string[];
  recurring: boolean;
  sort: string;
}

const History = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<Transacao | null>(
    null
  );
  const [filters, setFilters] = useState<Filters>({
    type: "",
    categories: [],
    recurring: false,
    sort: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const {
    items,
    loadingGet,
    errorGet,
    loadingDelete,
    errorDelete,
    successDelete,
  } = useSelector((state: RootReducer) => state.transactions);
  const { despesa, receita } = useSelector(
    (state: RootReducer) => state.categories
  );

  let filtered = items.map((item) => {
    if (!item.categoria) {
      const source = item.type === 0 ? receita : despesa;
      const categoria = source.find((c) => c.id === item.categoriaId);
      return { ...item, categoria };
    }
    return item;
  });

  if (filters.type === "receita")
    filtered = filtered.filter((i) => i.type === 0);
  if (filters.type === "despesa")
    filtered = filtered.filter((i) => i.type === 1);
  if (filters.categories.length > 0) {
    filtered = filtered.filter((i) =>
      filters.categories.includes(i.categoriaId)
    );
  }
  if (filters.recurring !== false) {
    filtered = filtered.filter((i) => i.isRecurring === filters.recurring);
  }
  if (filters.sort === "dataAsc") {
    filtered.sort(
      (a, b) =>
        new Date(a.dataMovimentacao).getTime() -
        new Date(b.dataMovimentacao).getTime()
    );
  }
  if (filters.sort === "dataDesc") {
    filtered.sort(
      (a, b) =>
        new Date(b.dataMovimentacao).getTime() -
        new Date(a.dataMovimentacao).getTime()
    );
  }
  if (filters.sort === "valorAsc") {
    filtered.sort((a, b) => Math.abs(a.valor) - Math.abs(b.valor));
  }
  if (filters.sort === "valorDesc") {
    filtered.sort((a, b) => b.valor - a.valor);
  }

  return (
    <HistorySection>
      <div className="container-hist-title">
        <p className="title-hist">Histórico de Transações</p>
        <Button
          bgColor={colors.verde}
          children="Filtros"
          padding="small"
          type="button"
          onClick={() => setIsFilterOpen(true)}
        />
      </div>

      <Modal
        onClose={() => setIsFilterOpen(!isFilterOpen)}
        isOpen={isFilterOpen}
      >
        <FilterHistory
          onApplyFilters={(f) => setFilters(f)}
          onClose={() => setIsFilterOpen(false)}
        />
      </Modal>

      {loadingGet || loadingDelete ? (
        <Loader />
      ) : errorGet ? (
        <Feedback noButton={true} error={errorGet} />
      ) : errorDelete ? (
        <Feedback error={errorDelete} />
      ) : successDelete ? (
        <Feedback success={successDelete} />
      ) : filtered.length == 0 ? (
        <Feedback
          success="Busca realizada com sucesso, mas nenhum item foi encontrado"
          noButton={true}
        />
      ) : (
        filtered.slice().map((item) => (
          <div className="container-transacao" key={item.id}>
            <div className="icon-hist">
              <IconBox color={item.type === 0 ? colors.verde : colors.vermelho}>
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
                  {toLocalDateIgnoreTimezone(
                    item.dataMovimentacao
                  ).toLocaleDateString()}
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
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setItemSelecionado(item);
                  }}
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
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <Delete
          onClose={() => {
            setIsDeleteModalOpen(false);
            setItemSelecionado(null);
          }}
          item={itemSelecionado}
        />
      </Modal>
    </HistorySection>
  );
};

export default History;
