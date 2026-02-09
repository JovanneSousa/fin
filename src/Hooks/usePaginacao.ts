import { useState } from "react";
import useIsMobile from "./useIsMobile";

export type QtdRegistros = 5 | 10 | 25 | 50 | 100;

export const usePaginacao = <T>(itemsFiltrados: T[]) => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [qtdRegistros, setQtdRegistros] = useState<QtdRegistros>(5);

  const inicio = (paginaAtual - 1) * qtdRegistros;
  const fim = inicio + qtdRegistros;

  const itemsPaginados = itemsFiltrados.slice(inicio, fim);
  const totalPaginas = Math.ceil(itemsFiltrados.length / qtdRegistros);
  const estaNaPrimeiraPagina = paginaAtual === 1;
  const estaNaUltimaPagina = paginaAtual === totalPaginas;

  const paginaAnterior = () => {
    setPaginaAtual((prev) => Math.max(prev - 1, 1));
  };

  const proximaPagina = () => {
    setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas));
  };

  const primeiraPagina = () => {
    setPaginaAtual(1);
  };

  const ultimaPagina = () => {
    setPaginaAtual(totalPaginas);
  };

  const changeQtdRegistros = (qtd: QtdRegistros) => {
    setQtdRegistros(qtd);
    setPaginaAtual(1);
  };

  const isMobile = useIsMobile();

  const tamanhoPadraoLinha = isMobile ? 61 : 56;
  const tamanhoTopoLinha = isMobile ? 23 : 0;

  const alturaLinha =
    itemsPaginados.length == 0
      ? `${3 * tamanhoPadraoLinha}px`
      : `${itemsPaginados.length * (tamanhoPadraoLinha + tamanhoTopoLinha)}px`;

  const linhas = {
    alturaLinha,
    tamanhoPadraoLinha,
    linhasTotais: itemsFiltrados.length,
    linhasAtuais: {
      inicio: (paginaAtual - 1) * qtdRegistros + 1,
      fim: Math.min(paginaAtual * qtdRegistros, itemsFiltrados.length),
    },
  };

  return {
    ultimaPagina,
    primeiraPagina,
    proximaPagina,
    paginaAnterior,
    changeQtdRegistros,
    qtdRegistros,
    linhas,
    itemsPaginados,
    estaNaPrimeiraPagina,
    estaNaUltimaPagina,
    isMobile,
  };
};
