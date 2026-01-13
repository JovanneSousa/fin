import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCategoryTable } from "../../Hooks/useCategoryTable";
import { CloseBox, DetailBox, StyledTable } from "./styles";
import { faCircleInfo, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import type { TabelaProps } from ".";
import RodapeTabelas from "./RodapeTabelas";
import TopoTabela from "./TopoTabela";

export const CategoriaTabela = ({ type }: TabelaProps) => {
  const { despesa, receita, abreBusca, fechaBusca, isSearching } =
    useCategoryTable();

  const [filter, setFilter] = useState<"receita" | "despesa">("despesa");

  return (
    <>
      <TopoTabela
        fechaBusca={fechaBusca}
        isSearching={isSearching}
        tipoFiltro={filter}
        type={type}
        setFilter={setFilter}
        abreBusca={abreBusca}
      />
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
      <RodapeTabelas />
    </>
  );
};
