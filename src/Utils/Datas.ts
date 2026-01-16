export const ultimoDiaMesAtual = () =>
  new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

export const subtraiMeses = (data: Date, qtd: number) =>
  new Date(data.getFullYear(), data.getMonth() - (qtd - 1), 1);
