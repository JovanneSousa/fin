import React, { useEffect } from "react";
import { CardStyled } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootReducer } from "../../Store";
import { fetchTransactions } from "../../Store/reducers/transactions";
import { formatCurrency } from "../../Utils";

interface CardProps {
  type?: number;
}

const CardCategories: React.FC<CardProps> = ({ type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootReducer) => state.transactions);
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  let valorTotal;

  if (type) {
    valorTotal = items.reduce((acc, item) => {
      return item.type === type ? acc + item.valor : acc;
    }, 0);
  } else {
    valorTotal = items.reduce((acc, item) => {
      return acc + item.valor;
    }, 0);
  }

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
