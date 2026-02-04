export const hexToRgb = (hex: string) => {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
};

export const formatCurrency = (valor: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};
export const toLocalDateIgnoreTimezone = (dateString: string) => {
  const [y, m, d] = dateString.split("T")[0].split("-");

  return `${d.padStart(2, "0")}/${m.padStart(2, "0")}/${y}`;
};

export type TypeCard = {
  receita: number;
  despesa: number;
  saldoAtual: number;
  balanco: number;
};

export const tiposCard: TypeCard = {
  balanco: 3,
  despesa: 1,
  receita: 0,
  saldoAtual: 2,
};

export const limitarTexto = (texto: string, limite = 16): string => {
  if (texto.length > limite) {
    return texto.slice(0, limite) + "...";
  }

  return texto;
};
