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
import Button from "../Button";
import { colors } from "../../globalStyles";
import { useFormNew } from "../../contexts/FormNew/useFormNew";

const TransacaoTabela = ({ type }: TabelaProps) => {
  const {
    isDeleteModalOpen,
    isOpen,
    itemSelecionado,
    items,
    valorBusca,
    isSearching,tipo,
    setIsDeleteModalOpen,
    abrirDetalhes,
    fecharDetalhes,
    setItemSelecionado,
    abreBusca,
    fechaBusca,
    setValorBusca,
    setTipo,
  } = useTransactionTable();

  const { abreModal } = useFormNew();

  const button = {
    receita: (
      <Button
        onClick={() => abreModal("receita")}
        padding="small"
        type="button"
        bgColor={colors.lightGray}
        icon="plus"
      >
        Nova Despesa
      </Button>
    ),
    despesa: (
      <Button
        onClick={() => abreModal("despesa")}
        padding="small"
        type="button"
        bgColor={colors.lightGray}
        icon="plus"
      >
        Nova Despesa
      </Button>
    ),
  };

  return (
    <>
      <TopoTabela isSearching={isSearching} onClick={fechaBusca} page={type}>
        <form className="tipo">
          <div className="input-wrapper">
            <select
              onChange={(e) =>
                setTipo(e.target.value as "todos" | "despesa" | "receita")
              }
              id="tipo"
            >
              <option value="todos">Todos</option>
              <option value="despesa">Despesas</option>
              <option value="receita">Receitas</option>
            </select>
          </div>
          <div className="button-container">
            {tipo != 'todos' && button[tipo]}
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
