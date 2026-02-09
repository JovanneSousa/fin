import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  formatCurrency,
  limitarTexto,
  toLocalDateIgnoreTimezone,
} from "../../Utils";
import {
  CloseBox,
  DetailBox,
  StyledIcon,
  StyledTable,
  StyledTopoTabela,
} from "./styles";
import {
  faCircleInfo,
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import type { TabelaProps } from ".";
import Modal from "../ModalContainer";
import { useTransactionTable } from "../../Hooks/useTransactionTable";
import Delete from "../Delete";
import RodapeTabelas from "./RodapeTabelas";
import Seletor from "../Seletor";
import Button from "../Button";
import { colors } from "../../globalStyles";
import { useFormNew } from "../../contexts/FormNew/useFormNew";
import Icone from "../Icone";
import "react-loading-skeleton/dist/skeleton.css";
import { TableSkeletonRow } from "../Loader/TableSkeletonLoader";
import Feedback from "../Feedback";
import { formataDataExtenso } from "../../Utils/Datas";

const TransacaoTabela = ({ type }: TabelaProps) => {
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
  } = useTransactionTable();

  const {
    itemsPaginados,
    qtdRegistros,
    isMobile,
    linhas: { alturaLinha, tamanhoPadraoLinha },
    busca, setBusca
  } = paginacao;

  const titulosTabela = isMobile ? (
    <tr>
      <th className="icone"></th>
      <th>Descrição</th>
      <th>Valor</th>
      <th>Ações</th>
    </tr>
  ) : (
    <tr>
      <th>Data</th>
      <th>Descrição</th>
      <th>Categoria</th>
      <th>Valor</th>
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
              className={`${item.categoria?.type == 0 ? "despesa" : "receita"}`}
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
        <td className={`${item.categoria?.type == 0 ? "despesa" : "receita"}`}>
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
  const { abreModal } = useFormNew();

  const button = {
    receita: (
      <Button
        bgColor={colors.verde}
        padding="small"
        type="button"
        icon="plus"
        onClick={() => abreModal("receita")}
      >
        Nova Receita
      </Button>
    ),
    despesa: (
      <Button
        bgColor={colors.vermelho}
        padding="small"
        type="button"
        icon="plus"
        onClick={() => abreModal("despesa")}
      >
        Nova Despesa
      </Button>
    ),
  };

  return (
    <>
      <StyledTopoTabela
        isMobile={isMobile}
        isSearching={isSearching}
        onClick={fechaBusca}
        page={type}
      >
        <form className="tipo">
          <div
            className={`input-wrapper seletor ${!isMobile || (isMobile && !isSearching) ? "" : "hidden"}`}
          >
            <select
              className={tipo}
              onChange={(e) =>
                changeType(e.target.value as "todos" | "despesa" | "receita")
              }
              id="tipo"
            >
              <option value="todos">Todos</option>
              <option value="despesa">Despesas</option>
              <option value="receita">Receitas</option>
            </select>
          </div>
          <div className="button-container">
            {tipo !== "todos" && !isMobile && button[tipo]}
            <div className="input-wrapper" onClick={(e) => e.stopPropagation()}>
              <input
                className="search"
                id="busca"
                type="text"
                placeholder="Pesquise por descrição, categoria ou valor"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
              <label htmlFor="busca">
                <StyledIcon onClick={abreBusca} icon={faMagnifyingGlass} />
              </label>
            </div>
          </div>
        </form>
        <Seletor page={type} />
      </StyledTopoTabela>
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
      <RodapeTabelas paginacao={paginacao} />
    </>
  );
};

export default TransacaoTabela;
