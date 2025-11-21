import type React from "react";
import { ContainerListCat } from "./styles";
import Button from "../Button";
import { colors } from "../../globalStyles";

interface CategorieListProps {
  onClose?: () => void;
}

const CategorieList: React.FC<CategorieListProps> = ({ onClose }) => {
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
      <div className="receita-list">
        <p>Categorias de Receita</p>
        <div className="container-lista-categoria">
          <div className="tag">
            Salário<button className="remove-btn">X</button>
          </div>
          <div className="tag">
            Freelance<button className="remove-btn">X</button>
          </div>
          <div className="tag">
            Investimento<button className="remove-btn">X</button>
          </div>
          <div className="tag">
            Investimento<button className="remove-btn">X</button>
          </div>
          <div className="tag">
            Investimento<button className="remove-btn">X</button>
          </div>
          <div className="tag">
            Outro<button className="remove-btn">X</button>
          </div>
        </div>
      </div>
      <div className="despesa-list">
        <p>Categorias de Despesa</p>
        <div className="container-lista-categoria">
          <div className="tag">
            Salário<button className="remove-btn">X</button>
          </div>
          <div className="tag">
            Freelance<button className="remove-btn">X</button>
          </div>
          <div className="tag">
            Investimento<button className="remove-btn">X</button>
          </div>
          <div className="tag">
            Outro <button className="remove-btn">X</button>
          </div>
        </div>
      </div>
    </ContainerListCat>
  );
};

export default CategorieList;
