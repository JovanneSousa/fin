import { useEffect } from "react";
import { CardStyled } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootReducer } from "../../Store";
import { fetchTransactions } from "../../Store/reducers/transactions";
import { formatCurrency } from "../../Utils";

const CardCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootReducer) => state.transactions);
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const valorTotal = items.reduce((acc, item) => {
    return item.type !== 1 ? acc + item.valor : acc;
  }, 0);

  return (
    <CardStyled>
      <p>Saldo</p>
      <p className="valor">{formatCurrency(valorTotal)}</p>
      <p>Receitas-Despesas</p>
    </CardStyled>
  );
};

export default CardCategories;
