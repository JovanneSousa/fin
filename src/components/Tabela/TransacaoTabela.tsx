import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  formatCurrency,
  limitarTexto,
  toLocalDateIgnoreTimezone,
} from "../../Utils";
import {
  CloseBox,
  DetailBox,
  StyledArrowFilter,
  StyledTable,
  TableWrapper,
} from "./styles";
import {
  faArrowDown,
  faCircleInfo,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../ModalContainer";
import { useTransactionTable } from "../../Hooks/useTransactionTable";
import Delete from "../Delete";
import RodapeTabelas from "./RodapeTabelas";
import Icone from "../Icone";
import "react-loading-skeleton/dist/skeleton.css";
import { TableSkeletonRow } from "../Loader/TableSkeletonLoader";
import Feedback from "../Feedback";
import { formataDataExtenso } from "../../Utils/Datas";
import FilterSection from "../FilterSection";
import { useState } from "react";
import { TransactionType } from "../../Utils/Enums/Transacao";
import type { TiposColuna } from "../../Hooks/useTransactions";
import TopoTabela from "./TopoTabela";

interface ColunaTabela {
  key: TiposColuna;
  label: string;
}

const TransacaoTabela = () => {
  const [isFilterActive, setIsFilterActive] = useState(false);
  const {
    isDeleteModalOpen,
    itemSelecionado,
    isSearching,
    tipo,
    statusPeriodo,
    setIsDeleteModalOpen,
    setItemSelecionado,
    abreBusca,
    fechaBusca,
    changeType,
    abrirDetalhes,
    paginacao,
    errorPeriodo,
    filtros,
  } = useTransactionTable();

  const { busca, setBusca, setFiltersModal, filtroTabela, toggleFiltroTabela } =
    filtros;

  const {
    itemsPaginados,
    qtdRegistros,
    isMobile,
    linhas: { alturaLinha, tamanhoPadraoLinha },
  } = paginacao;

  const valoresTituloTabela: ColunaTabela[] = [
    { key: "data", label: "Data" },
    { key: "descricao", label: "Descrição" },
    { key: "categoria", label: "Categoria" },
    { key: "valor", label: "Valor" },
  ];

  const titulosTabela = isMobile ? (
    <tr>
      <th className="icone"></th>
      <th>Descrição</th>
      <th>Valor</th>
      <th>Ações</th>
    </tr>
  ) : (
    <tr>
      {valoresTituloTabela.map((t) => (
        <th key={t.key}>
          {t.label}{" "}
          <StyledArrowFilter
            isActive={filtroTabela.isActive == t.key}
            icon={faArrowDown}
            className={filtroTabela.type == "desc" ? "" : "rotate"}
            onClick={() => toggleFiltroTabela(t.key)}
          />
        </th>
      ))}
      <th>Ações</th>
    </tr>
  );

  const conteudoTabela = () => {
    if (statusPeriodo == "failed")
      return <Feedback error={errorPeriodo} noButton={true} />;

    if (statusPeriodo == "loading")
      return Array.from({ length: qtdRegistros }).map((_, index) => (
        <TableSkeletonRow key={index} columns={5} />
      ));

    if (statusPeriodo == "succeeded" && itemsPaginados.length == 0)
      return <Feedback info="Nenhum item encontrado" noButton={true} />;

    if (isMobile)
      return itemsPaginados.map((item) => (
        <>
          <tr className="data-wrapper">
            <td>{formataDataExtenso(item.dataMovimentacao)}</td>
          </tr>
          <tr key={item.id}>
            <td className="icone">
              {item.categoria != null && item.categoria != undefined && (
                <Icone
                  background={item.categoria.cor.url}
                  tipoIcone={item.categoria.icone.url}
                />
              )}
            </td>
            <td>
              {limitarTexto(item.titulo)}
              <p className="cat">{item.categoria?.name || "Sem categoria"}</p>
            </td>
            <td
              className={`${item.type == TransactionType.Renda ? "receita" : "despesa"}`}
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
        </>
      ));

    return itemsPaginados.map((item) => (
      <tr key={item.id}>
        <td>{toLocalDateIgnoreTimezone(item.dataMovimentacao)}</td>
        <td>{item.titulo}</td>
        <td>
          {item.categoria != null && item.categoria != undefined ? (
            <div className="button-container categorias">
              <Icone
                background={item.categoria.cor.url}
                tipoIcone={item.categoria.icone.url}
              />
              <p>{item.categoria.name}</p>
            </div>
          ) : (
            <p>"Sem categoria"</p>
          )}
        </td>
        <td
          className={`${item.type == TransactionType.Despesa ? "despesa" : "receita"}`}
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
    ));
  };

  return (
    <TableWrapper className="shadow">
      <TopoTabela
        tipo="transacoes"
        props={{
          changeType,
          fechaBusca,
          isMobile,
          isSearching,
          tipoFiltro: tipo,
          abreBusca,

          busca,
          setIsFilterActive,
          setBusca,
        }}
      />
      <StyledTable
        rowHeight={tamanhoPadraoLinha.toString()}
        isMobile={isMobile}
        tableHeight={alturaLinha}
      >
        <thead>{titulosTabela}</thead>
        <tbody>{conteudoTabela()}</tbody>
      </StyledTable>
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
      <Modal isOpen={isFilterActive} onClose={() => setIsFilterActive(false)}>
        <FilterSection
          onClose={() => setIsFilterActive(false)}
          onApplyFilters={(f) => setFiltersModal(f)}
        />
      </Modal>
      <RodapeTabelas paginacao={paginacao} />
    </TableWrapper>
  );
};

export default TransacaoTabela;
