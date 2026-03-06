import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCategoryTable } from "../../Hooks/useCategoryTable";
import {
  CloseBox,
  DetailBox,
  StyledTable,
  TableWrapper,
} from "./styles";
import {
  faCircleInfo,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import RodapeTabelas from "./RodapeTabelas";
import Icone from "../Icone";
import ContainerCor from "../ContainerCor";
import { TableSkeletonRow } from "../Loader/TableSkeletonLoader";
import Feedback from "../Feedback";
import TopoTabela from "./TopoTabela";

export const CategoriaTabela = () => {
  const {
    categorias,
    abreBusca,
    fechaBusca,
    isSearching,
    abrirDetalhes,
    deletarCategoria,
  } = useCategoryTable();

  const [filter, setFilter] = useState<"receita" | "despesa">("despesa");
  const [valorBusca, setValorBusca] = useState("");

  const {
    despesaPaginada: {
      itemsPaginados: despesa,
      linhas: { alturaLinha: alturaTabelaDespesa, tamanhoPadraoLinha },
      qtdRegistros: qtdRegistrosDespesa,
      isMobile,
    },
    receitaPaginada: {
      itemsPaginados: receita,
      linhas: { alturaLinha: alturaTabelaReceita },
      qtdRegistros: qtdRegistrosReceita,
    },
  } = categorias;

  const isLoading = categorias.status == "loading";
  const isError = categorias.status == "failed";
  const isEmpty =
    categorias.status == "succeeded" &&
    (despesa.length == 0 || receita.length == 0);
  const errorMessage = categorias.error;
  const qtdRegistros = qtdRegistrosDespesa || qtdRegistrosReceita;

  const conteudoTabela = () => {
    if (isError) return <Feedback error={errorMessage} noButton={true} />;

    if (isLoading)
      return Array.from({ length: qtdRegistros }).map((_, index) => (
        <TableSkeletonRow key={index} columns={5} />
      ));

    if (isEmpty)
      return <Feedback info="Nenhum item encontrado" noButton={true} />;

    if (filter == "despesa")
      return despesa.map((d) => (
        <tr key={d.id}>
          <td>{d.name}</td>
          <td>
            <Icone tipoIcone={d.icone.url} />
          </td>
          <td>
            <ContainerCor cor={d.cor.url} />
          </td>
          <td>
            <div className="button-container">
              <DetailBox onClick={() => abrirDetalhes(d.id)}>
                <FontAwesomeIcon icon={faCircleInfo} size="lg" />
              </DetailBox>
              <CloseBox onClick={() => deletarCategoria(d.id)}>
                <FontAwesomeIcon icon={faCircleXmark} size="lg" />
              </CloseBox>
            </div>
          </td>
        </tr>
      ));
    if (filter == "receita")
      return receita.map((d) => (
        <tr key={d.id}>
          <td>{d.name}</td>
          <td>
            <Icone tipoIcone={d.icone.url} />
          </td>
          <td>
            <ContainerCor cor={d.cor.url} />
          </td>
          <td>
            <div className="button-container">
              <div className="button-container">
                <DetailBox onClick={() => abrirDetalhes(d.id)}>
                  <FontAwesomeIcon icon={faCircleInfo} size="lg" />
                </DetailBox>
                <CloseBox onClick={() => deletarCategoria(d.id)}>
                  <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                </CloseBox>
              </div>
            </div>
          </td>
        </tr>
      ));
  };

  return (
    <TableWrapper className="shadow">
      <TopoTabela
        tipo="categorias"
        props={{
          abreBusca,
          fechaBusca,
          filter,
          isMobile,
          isSearching,
          setFilter,
          busca: valorBusca,
          setBusca: setValorBusca,
        }}
      />
      <StyledTable
        isMobile={isMobile}
        tableHeight={tamanhoPadraoLinha.toString()}
        rowHeight={
          filter == "despesa" ? alturaTabelaDespesa : alturaTabelaReceita
        }
      >
        <thead>
          <tr>
            <th>Nome</th>
            <th>Icone</th>
            <th>Cor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{conteudoTabela()}</tbody>
      </StyledTable>
      <RodapeTabelas
        paginacao={
          filter == "despesa"
            ? categorias.despesaPaginada
            : categorias.receitaPaginada
        }
      />
    </TableWrapper>
  );
};
