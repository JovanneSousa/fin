import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    defaultBackgroundColor: string;
    gray: string;
    lightGray: string;
    lighterGray: string;
    shiningGray: string;
    darkGray: string;
  }
}
