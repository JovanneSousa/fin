import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCategoryTable } from "../../Hooks/useCategoryTable";
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
import { useState } from "react";
import type { TabelaProps } from ".";
import Button from "../Button";
import { colors } from "../../globalStyles";
import { useFormNew } from "../../contexts/FormNew/useFormNew";
import RodapeTabelas from "./RodapeTabelas";

export const CategoriaTabela = ({ type }: TabelaProps) => {
  const {
    despesaPaginada,
    receitaPaginada,
    abreBusca,
    fechaBusca,
    isSearching,
  } = useCategoryTable();

  const [filter, setFilter] = useState<"receita" | "despesa">("despesa");
  const [valorBusca, setValorBusca] = useState("");

  const { itemsPaginados: despesa } = despesaPaginada;
  const { itemsPaginados: receita } = receitaPaginada;

  const { abreModal } = useFormNew();

  return (
    <>
      <StyledTopoTabela
        onClick={fechaBusca}
        page={type}
        isSearching={isSearching}
      >
        <div className="button-container">
          <Button
            bgColor={filter == "despesa" ? colors.vermelho : colors.lightGray}
            padding="small"
            type="button"
            onClick={() => setFilter("despesa")}
          >
            Despesa
          </Button>
          <Button
            bgColor={filter == "receita" ? colors.verde : colors.lightGray}
            padding="small"
            type="button"
            onClick={() => setFilter("receita")}
          >
            Receita
          </Button>
        </div>
        <form>
          <div className="button-container">
            <Button
              bgColor={colors.lightGray}
              padding="small"
              type="button"
              icon="plus"
              onClick={() => abreModal("categoria")}
            >
              Nova Categoria
            </Button>
            <div className="input-wrapper" onClick={(e) => e.stopPropagation()}>
              <input
                className="search"
                id="busca"
                type="text"
                placeholder="Pesquise pelo nome da categoria"
                value={valorBusca}
                onChange={(e) => setValorBusca(e.target.value)}
              />
              <label htmlFor="busca">
                <StyledIcon onClick={abreBusca} icon={faMagnifyingGlass} />
              </label>
            </div>
          </div>
        </form>
      </StyledTopoTabela>
      <StyledTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Icone</th>
            <th>Cor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filter == "despesa" &&
            despesa.map((d) => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>Icone da Tag</td>
                <td>
                  <div className="container-cor" />
                </td>
                <td>
                  <div className="button-container">
                    <DetailBox>
                      <FontAwesomeIcon icon={faCircleInfo} size="lg" />
                    </DetailBox>
                    <CloseBox
                    //   onClick={() => {
                    //     setIsDeleteModalOpen(true);
                    //     setItemSelecionado(item);
                    //   }}
                    >
                      <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                    </CloseBox>
                  </div>
                </td>
              </tr>
            ))}
          {filter == "receita" &&
            receita.map((d) => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>Icone da Tag</td>
                <td>"Cor da Tag"</td>
                <td>
                  <div className="button-container">
                    <DetailBox>
                      <FontAwesomeIcon icon={faCircleInfo} size="lg" />
                    </DetailBox>
                    <CloseBox
                    //   onClick={() => {
                    //     setIsDeleteModalOpen(true);
                    //     setItemSelecionado(item);
                    //   }}
                    >
                      <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                    </CloseBox>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </StyledTable>
      {/* <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
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
      </Modal> */}
      <RodapeTabelas
        paginacao={filter == "despesa" ? despesaPaginada : receitaPaginada}
      />
    </>
  );
};
