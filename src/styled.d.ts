import "styled-components";
import { AppTheme } from "./colors";

declare module "styled-components" {
  export type DefaultTheme = AppTheme;
}
