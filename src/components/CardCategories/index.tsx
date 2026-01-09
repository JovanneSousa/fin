import React, { useEffect, useMemo } from "react";
import { CardStyled } from "./styles";
import { type AppDispatch, type RootReducer } from "../../Store";
import { formatCurrency, tiposCard } from "../../Utils";
import { useDispatch, useSelector } from "react-redux";
import { IconBox } from "../../globalStyles";
import { cardConfig } from "./CardConfig";
import { fetchSaldoTotal } from "../../Store/reducers/transactions";

interface CardProps {
  type: number;
}

const CardCategories: React.FC<CardProps> = ({ type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, getSaldoTotal } = useSelector(
    (state: RootReducer) => state.transactions
  );

  useEffect(() => {
    if (type === tiposCard.saldoAtual) {
      dispatch(fetchSaldoTotal());
    }
  }, [type, dispatch]);

  const valorTotal = useMemo(() => {
    if (type != tiposCard.balanco && type != tiposCard.saldoAtual) {
      return items.reduce(
        (acc, item) => (item.type === type ? acc + item.valor : acc),
        0
      );
    }

    if (type == tiposCard.saldoAtual && getSaldoTotal) return getSaldoTotal;

    const valorReceita = items.reduce(
      (acc, item) => (item.type === 0 ? acc + item.valor : acc),
      0
    );
    const valorDespesa = items.reduce(
      (acc, item) => (item.type === 1 ? acc + item.valor : acc),
      0
    );
    return valorReceita - valorDespesa;
  }, [items, type]);

  const config = cardConfig[type];

  return (
    <CardStyled className={config.className}>
      <div>
        <p>{config.title}</p>
        <p className="valor">{formatCurrency(valorTotal)}</p>
      </div>
      <IconBox color={config.color}>{config.icon}</IconBox>
    </CardStyled>
  );
};

export default CardCategories;
