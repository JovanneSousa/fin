import React, { useMemo } from "react";
import { CardStyled } from "./styles";
import {  type RootReducer } from "../../Store";
import { formatCurrency } from "../../Utils";
import { useSelector } from "react-redux";

interface CardProps {
  type?: number;
}

const CardCategories: React.FC<CardProps> = ({ type }) => {
  const { items } = useSelector((state: RootReducer) => state.transactions);
  const valorTotal = useMemo(() => {
    if (type !== undefined && type !== null) {
      return items.reduce(
        (acc, item) => (item.type === (type) ? acc + item.valor : acc),
        0
      );
    } else {
      const valorReceita = items.reduce(
        (acc, item) => (item.type === 0 ? acc + item.valor : acc),
        0
      );
      const valorDespesa = items.reduce(
        (acc, item) => (item.type === 1 ? acc + item.valor : acc),
        0
      );
      return valorReceita - valorDespesa;
    }
  }, [items, type]);

  return (
    <CardStyled
      className={type === 0 ? "receita" : type === 1 ? "despesa" : "saldo"}
    >
      <p>{type === 0 ? "Receita" : type === 1 ? "Despesa" : "Saldo"}</p>
      <p className="valor">{formatCurrency(valorTotal)}</p>
      <p>Mês</p>
    </CardStyled>
  );
};

export default CardCategories;
