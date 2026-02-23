import { useState } from "react";
import Button from "../Button";
import { colors } from "../../globalStyles";
import ButtonPill from "../ButtonPill";
import useTransactions from "../../Hooks/useTransactions";
import useCategory from "../../Hooks/useCategory";
import { FilterContainer } from "./styles";
import { TransactionType } from "../../Utils/Enums/Transacao";

interface FilterSectionProps {
  onClose: () => void;
  onApplyFilters: (filters: {
    type: string;
    categories: string[];
    recurring: boolean;
    sort: string;
  }) => void;
}

const FilterSection = ({ onClose, onApplyFilters }: FilterSectionProps) => {
  const [filterType, setFilterType] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [sort, setSort] = useState<string>("");
  const {
    categorias: { receita, despesa },
  } = useCategory();

  const {
    itemsPeriodo: { itemsFiltrados: items },
  } = useTransactions();

  const receitaFiltrada = receita.filter((c) => {
    return items.some(
      (i) => i.type === TransactionType.Renda && i.categoriaId === c.id,
    );
  });

  const despesaFiltrada = despesa.filter((d) => {
    return items.some(
      (i) => i.type === TransactionType.Despesa && i.categoria?.id === d.id,
    );
  });

  const handleCategoryToggle = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  return (
    <FilterContainer>
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

      {filterType != "" && (
        <>
          <p>Categorias</p>
          <div className="container-cat-filter">
            {filterType === "receita" &&
              receitaFiltrada.map((r) => (
                <ButtonPill
                  className={
                    selectedCategories.includes(r.id) ? "is-active" : ""
                  }
                  key={r.id}
                  onClick={() => handleCategoryToggle(r.id)}
                >
                  {r.name}
                </ButtonPill>
              ))}

            {filterType === "despesa" &&
              despesaFiltrada.map((d) => (
                <ButtonPill
                  className={
                    selectedCategories.includes(d.id) ? "is-active" : ""
                  }
                  key={d.id}
                  onClick={() => handleCategoryToggle(d.id)}
                >
                  {d.name}
                </ButtonPill>
              ))}
          </div>
        </>
      )}

      <div className="container-recorrencia">
        <p>Recorrência</p>
        <ButtonPill
          className={isRecurring ? "is-active" : ""}
          onClick={() => setIsRecurring(!isRecurring)}
        >
          {filterType === "despesa" ? "Parcelada" : "Recorrente"}
        </ButtonPill>
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
    </FilterContainer>
  );
};

export default FilterSection;
