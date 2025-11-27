import React, { useState } from "react";
import { FilterHistorySection } from "./styles";
import { useSelector } from "react-redux";
import type { RootReducer } from "../../Store";
import Button from "../Button";
import { colors } from "../../globalStyles";
import ButtonPill from "../ButtonPill";

interface FilterHistoryProps {
  onClose: () => void;
  onApplyFilters: (filters: {
    type: string;
    categories: string[];
    recurring: boolean;
    sort: string;
  }) => void;
}

const FilterHistory: React.FC<FilterHistoryProps> = ({
  onClose,
  onApplyFilters,
}) => {
  const [filterType, setFilterType] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [sort, setSort] = useState<string>("");

  const { despesa, receita } = useSelector(
    (state: RootReducer) => state.categories
  );

  const { items } = useSelector((state: RootReducer) => state.transactions);

  const receitaFiltrada = receita.filter((c) => {
    return items.some((i) => i.type === 0 && i.categoriaId === c.id);
  });


  const despesaFiltrada = despesa.filter((d) => {
    return items.some((i) => i.type === 1 && i.categoria?.id === d.id);
  });

  const handleCategoryToggle = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <FilterHistorySection>
      <div className="container-title-filter">
        <p>Filtros e Ordenação</p>
        <Button
          bgColor={colors.transparent}
          padding="small"
          children="X"
          type="button"
          onClick={onClose}
        />
      </div>

      <div>
        <p>Tipos</p>
        <div className="filtros">
          <ButtonPill
            className={filterType === "receita" ? "is-active" : ""}
            onClick={() =>
              setFilterType(filterType === "receita" ? "" : "receita")
            }
          >
            Receitas
          </ButtonPill>
          <ButtonPill
            className={filterType === "despesa" ? "is-active" : ""}
            onClick={() =>
              setFilterType(filterType === "despesa" ? "" : "despesa")
            }
          >
            Despesas
          </ButtonPill>
        </div>
      </div>

      <p>Categorias</p>
      <div className="container-cat-filter">
        {filterType === "receita" &&
          receitaFiltrada.map((r) => (
            <ButtonPill
              className={selectedCategories.includes(r.id) ? "is-active" : ""}
              key={r.id}
              onClick={() => handleCategoryToggle(r.id)}
            >
              {r.name}
            </ButtonPill>
          ))}

        {filterType === "despesa" &&
          despesaFiltrada.map((d) => (
            <ButtonPill
              className={selectedCategories.includes(d.id) ? "is-active" : ""}
              key={d.id}
              onClick={() => handleCategoryToggle(d.id)}
            >
              {d.name}
            </ButtonPill>
          ))}
      </div>

      <div className="container-recorrencia">
        <p>Recorrência</p>
        <div className="filtros">
          <ButtonPill
            className={isRecurring ? "is-active" : ""}
            onClick={() => setIsRecurring(!isRecurring)}
          >
            {filterType === "despesa" ? "Parcelada" : "Recorrente"}
          </ButtonPill>
        </div>
      </div>

      <div className="container-ord">
        <p>Ordenar por</p>
        <div className="buttons">
          <ButtonPill
            className={sort === "dataAsc" ? "is-active" : ""}
            onClick={() => setSort(sort === "dataAsc" ? "" : "dataAsc")}
          >
            Data (Asc)
          </ButtonPill>
          <ButtonPill
            className={sort === "dataDesc" ? "is-active" : ""}
            onClick={() => setSort(sort === "dataDesc" ? "" : "dataDesc")}
          >
            Data (Desc)
          </ButtonPill>
          <ButtonPill
            className={sort === "valorAsc" ? "is-active" : ""}
            onClick={() => setSort(sort === "valorAsc" ? "" : "valorAsc")}
          >
            Valor (Asc)
          </ButtonPill>
          <ButtonPill
            className={sort === "valorDesc" ? "is-active" : ""}
            onClick={() => setSort(sort === "valorDesc" ? "" : "valorDesc")}
          >
            Valor (Desc)
          </ButtonPill>
        </div>
      </div>

      <div className="buttons-container">
        <Button
          padding="small"
          type="button"
          bgColor={colors.lightGray}
          onClick={() => {
            setFilterType("");
            setSelectedCategories([]);
            setSort("");
            setIsRecurring(false);
          }}
        >
          Limpar
        </Button>
        <Button
          padding="small"
          type="button"
          bgColor={colors.verde}
          onClick={() => {
            onApplyFilters({
              type: filterType,
              categories: selectedCategories,
              recurring: isRecurring,
              sort: sort,
            });
            onClose();
          }}
        >
          Aplicar
        </Button>
      </div>
    </FilterHistorySection>
  );
};

export default FilterHistory;
