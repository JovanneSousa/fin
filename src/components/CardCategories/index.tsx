import React, { useEffect, useMemo } from "react";
import { CardStyled } from "./styles";
import { formatCurrency, tiposCard } from "../../Utils";
import { IconBox } from "../../globalStyles";
import { cardConfig } from "./CardConfig";
import useTransactions from "../../Hooks/useTransactions";
import Skeleton from "react-loading-skeleton";

interface CardProps {
  type: number;
}

const CardCategories: React.FC<CardProps> = ({ type }) => {
  const {
    itemsPeriodo: { itemsFiltrados: items, statusPeriodo },
    saldoTotal,
    buscaSaldoTotal,
  } = useTransactions();

  useEffect(() => {
    if (type === tiposCard.saldoAtual && !saldoTotal) buscaSaldoTotal();
  }, [type, saldoTotal, buscaSaldoTotal]);

  const valorTotal = useMemo(() => {
    let receita = 0;
    let despesa = 0;

    for (const item of items) {
      if (item.type === 0) receita += item.valor;
      if (item.type === 1) despesa += item.valor;
    }

    if (type === tiposCard.saldoAtual) return saldoTotal ?? 0;
    if (type === tiposCard.balanco) return receita - despesa;

    return type === 0 ? receita : despesa;
  }, [items, type, saldoTotal]);

  const config = cardConfig[type];

  const LoaderCard = (
    <>
      <div className="content">
        <p>
          <Skeleton />
        </p>
        <Skeleton className="valor" />
      </div>
      <Skeleton circle={true} />
    </>
  );

  return (
    <CardStyled className={`${config.className} shadow`}>
      {statusPeriodo == "loading" && LoaderCard}
      {statusPeriodo == "succeeded" && (
        <>
          <div className="content">
            <p>{config.title}</p>
            <p className="valor">{formatCurrency(valorTotal)}</p>
          </div>
          <IconBox color={config.color}>{config.icon}</IconBox>
        </>
      )}
    </CardStyled>
  );
};

export default CardCategories;
