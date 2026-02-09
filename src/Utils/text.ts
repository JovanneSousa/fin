export const normalizaTexto = (texto?: string) => {
  if (!texto?.trim()) return "";
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(",", ".")
    .replace(/[\u0300-\u036f]/g, "");
};
