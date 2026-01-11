import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatCurrency, toLocalDateIgnoreTimezone } from "../../Utils";
import Seletor from "../Seletor";
import {
  CloseBox,
  DetailBox,
  StyledIcon,
  StyledTable,
  TopoTabela,
} from "./styles";
import {
  faCircleInfo,
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import type { TabelaProps } from ".";
import Modal from "../ModalContainer";
import TransacaoDetails from "../TransactionDetails";
import { useTransactionTable } from "../../Hooks/useTransactionTable";
import Delete from "../Delete";
import RodapeTabelas from "./RodapeTabelas";

const TransacaoTabela = ({ type }: TabelaProps) => {
  const {
    isDeleteModalOpen,
    isOpen,
    itemSelecionado,
    items,
    valorBusca,
    isSearching,
    setIsDeleteModalOpen,
    abrirDetalhes,
    fecharDetalhes,
    setItemSelecionado,
    abreBusca,
    fechaBusca,
    setValorBusca,
  } = useTransactionTable();

  return (
    <>
      <TopoTabela isSearching={isSearching} onClick={fechaBusca} page={type}>
        <form className="tipo">
          <div className="input-wrapper">
            <select id="tipo">
              <option value="">Todos</option>
              <option value="">Despesas</option>
              <option value="">Receitas</option>
            </select>
          </div>
          <div className="input-wrapper" onClick={(e) => e.stopPropagation()}>
            <input
              className="search"
              id="busca"
              type="text"
              placeholder="Pesquise por descrição, categoria ou valor"
              value={valorBusca}
              onChange={(e) => setValorBusca(e.target.value)}
            />
            <label htmlFor="busca">
              <StyledIcon onClick={abreBusca} icon={faMagnifyingGlass} />
            </label>
          </div>
        </form>
        <Seletor page={type} />
      </TopoTabela>
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
