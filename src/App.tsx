import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Rotas from "./routes";
import FormNewProvider from "./contexts/FormNew/FormNewProvider";
import "react-loading-skeleton/dist/skeleton.css";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { GlobalStyle } from "./styles/globalstyle";
import { type RootReducer } from "./Store";

function App() {
  const { dark } = useSelector((state: RootReducer) => state.theme);

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <FormNewProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Rotas />
        </BrowserRouter>
      </FormNewProvider>
    </ThemeProvider>
  );
}

export default App;
