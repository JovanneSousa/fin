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
  const {
    periodoSelecionado: { items },
    getSaldoTotal,
  } = useSelector((state: RootReducer) => state.transactions);

  useEffect(() => {
    if (type === tiposCard.saldoAtual && !getSaldoTotal) {
      dispatch(fetchSaldoTotal());
    }
  }, [type, getSaldoTotal, dispatch]);

  const valorTotal = useMemo(() => {
    let receita = 0;
    let despesa = 0;

    for (const item of items) {
      if (item.type === 0) receita += item.valor;
      if (item.type === 1) despesa += item.valor;
    }

    if (type === tiposCard.saldoAtual) return getSaldoTotal ?? 0;
    if (type === tiposCard.balanco) return receita - despesa;

    return type === 0 ? receita : despesa;
  }, [items, type, getSaldoTotal]);

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
