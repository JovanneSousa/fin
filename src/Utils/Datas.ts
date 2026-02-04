export const ultimoDiaMesAtual = () =>
  new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );

export const subtraiMeses = (data: Date, qtd: number) =>
  new Date(data.getFullYear(), data.getMonth() - (qtd - 1), 1);

export const formataDataExtenso = (dataPuro: Date | string) => {
  const data = new Date(dataPuro);

  const mes = new Date(data.getMonth()).toLocaleDateString("pt-BR", {
    month: "short",
    timeZone: "UTC",
  });
  const dia = data.getDate();
  return `${dia} de ${mes}`;
};
