import type React from "react";
import { ContainerListCat } from "./styles";
import Button from "../Button";
import { colors } from "../../globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootReducer } from "../../Store";
import { useEffect } from "react";
import { getCategories } from "../../Store/reducers/categories";
import Loader from "../Loader";

interface CategorieListProps {
  onClose?: () => void;
}

const CategorieList: React.FC<CategorieListProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { receita, despesa, error, loading } = useSelector(
    (state: RootReducer) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <ContainerListCat>
      <div className="container-title-categories">
        <p>Categorias Existentes</p>
        <Button
          bgColor={colors.vermelho}
          children="Fechar"
          type="button"
          onClick={onClose}
          padding="small"
        />
      </div>

      {error? <p>Erro ao carregar categorias</p> :loading ? (
        <Loader />
      ) : (
        <>
          <div className="receita-list">
            <p>Categorias de Receita</p>
            <div className="container-lista-categoria">
              {receita.map((cat) => (
                <div key={cat.id} className="tag">
                  {cat.name}
                  <button className="remove-btn">X</button>
                </div>
              ))}
            </div>
          </div>
          <div className="despesa-list">
            <p>Categorias de Despesa</p>
            <div className="container-lista-categoria">
              {despesa.map((cat) => (
                <div key={cat.id} className="tag">
                  {cat.name}
                  <button className="remove-btn">X</button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </ContainerListCat>
  );
};

export default CategorieList;
