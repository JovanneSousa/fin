import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatCurrency, toLocalDateIgnoreTimezone } from "../../Utils";
import { CloseBox, DetailBox, StyledTable } from "./styles";
import { faCircleInfo, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import type { TabelaProps } from ".";
import Modal from "../ModalContainer";
import TransacaoDetails from "../TransactionDetails";
import { useTransactionTable } from "../../Hooks/useTransactionTable";
import Delete from "../Delete";
import RodapeTabelas from "./RodapeTabelas";
import { TopoTabela } from "./TopoTapela";

const TransacaoTabela = ({ type }: TabelaProps) => {
  const {
    isDeleteModalOpen,
    isOpen,
    itemSelecionado,
    items,
    isSearching,
    tipo,
    setIsDeleteModalOpen,
    abrirDetalhes,
    fecharDetalhes,
    setItemSelecionado,
    abreBusca,
    fechaBusca,
    setTipo,
  } = useTransactionTable();

  return (
    <>
      <TopoTabela
        abreBusca={abreBusca}
        fechaBusca={fechaBusca}
        type={type}
        isSearching={isSearching}
        tipoFiltro={tipo}
        setFilter={setTipo}
      />
      <StyledTable>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{toLocalDateIgnoreTimezone(item.dataMovimentacao)}</td>
              <td>{item.titulo}</td>
              <td>{item.categoria?.name ?? "sem categoria"}</td>
              <td
                className={`${
                  item.categoria?.type == 0 ? "despesa" : "receita"
                }`}
              >
                {formatCurrency(item.valor)}
              </td>
              <td>
                <div className="button-container">
                  <DetailBox onClick={() => abrirDetalhes(item.id!)}>
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
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Modal isOpen={isOpen} onClose={fecharDetalhes}>
        <TransacaoDetails onClose={fecharDetalhes} />
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
      <RodapeTabelas />
    </>
  );
};

export default TransacaoTabela;
