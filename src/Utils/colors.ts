export const BASE_COLORS = {
  rosa: "#c850c0",
  roxo: "#4158d0",
  gradient: "linear-gradient(-135deg, #c850c0, #4158d0)",
  preto: "#000",
  shadow: "0 1px 3px 0 rgba(0, 0, 0, 0.3)",
  branco: "#fff",
  verde: "#57b846",
  vermelho: "#e63946",
  azul: "#3498db",
  laranja: "#f39c12",
  transparent: "transparent",
  verdeClaro: "#e6f4ea",
  vermelhoClaro: "#fde8ea",
};

export const COLORS_WHITE = {
  textColor: "#000",
  defaultBackgroundColor: "#fff",
  gray: "#666666",
  lightGray: "#e6e6e6",
  lighterGray: "#f5f5f5",
  shiningGray: "#f9f9f9",
  darkGray: "#333333",
};

export const COLORS_BLACK = {
  textColor: "#eaeaea",
  defaultBackgroundColor: "#141414",
  gray: "#b3b3b3",
  lightGray: "#1F1F1F",
  lighterGray: "#1F1F1F",
  shiningGray: "#0A0A0A",
  darkGray: "#eaeaea",
};

export const lightTheme = { ...BASE_COLORS, ...COLORS_WHITE };
export const darkTheme  = { ...BASE_COLORS, ...COLORS_BLACK };

// Tipagem global para o styled-components reconhecer o tema
export type AppTheme = typeof lightTheme;