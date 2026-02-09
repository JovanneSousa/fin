import { useState } from "react";
import useIsMobile from "./useIsMobile";
import type { Transacao } from "../Store/reducers/transactions";
import type { Category } from "../Store/reducers/categories";
import { normalizaTexto } from "../Utils/text";

export type QtdRegistros = 5 | 10 | 25 | 50 | 100;

type Item = Transacao | Category;

export const usePaginacao = <T extends Item>(itemsFiltrados: T[]) => {
  const isCategoria = (item: Item): item is Category => {
    return "name" in item && "cor" in item && "icone" in item;
  };

  const isTransacao = (item: Item): item is Transacao => {
    return "titulo" in item && "valor" in item;
  };

  const aplicaFiltroTexto = <T extends Item>(
    items: T[],
    texto: string,
  ): T[] => {
    if (!texto.trim()) return items;

    const termo = normalizaTexto(texto);

    return items.filter((item) => {
      if (isCategoria(item)) {
        return normalizaTexto(item.name).includes(termo);
      }

      if (isTransacao(item)) {
        return (
          normalizaTexto(item.titulo).includes(termo) ||
          normalizaTexto(item.categoria?.name).includes(termo) ||
          normalizaTexto(item.valor.toString()).includes(termo)
        );
      }

      return false;
    }) as T[];
  };

  const [busca, setBusca] = useState<string>("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [qtdRegistros, setQtdRegistros] = useState<QtdRegistros>(5);

  const inicio = (paginaAtual - 1) * qtdRegistros;
  const fim = inicio + qtdRegistros;

  const itemsFIltradosPorTexto = aplicaFiltroTexto(itemsFiltrados, busca);

  const itemsPaginados = itemsFIltradosPorTexto.slice(inicio, fim);
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
    busca,
    setBusca,
    qtdRegistros,
    linhas,
    itemsPaginados,
    estaNaPrimeiraPagina,
    estaNaUltimaPagina,
    isMobile,
  };
};
