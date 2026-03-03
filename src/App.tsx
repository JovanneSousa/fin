import { GlobalStyle } from "./globalStyles";
import { Provider } from "react-redux";
import { store } from "./Store";
import { BrowserRouter } from "react-router-dom";
import Rotas from "./routes";
import FormNewProvider from "./contexts/FormNew/FormNewProvider";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "./Hooks/useTheme";
import { ThemeProvider } from "styled-components";

function App() {
  const { tema } = useTheme();
  return (
    <Provider store={store}>
      <ThemeProvider theme={tema}>
        <FormNewProvider>
          <GlobalStyle />
          <BrowserRouter>
            <Rotas />
          </BrowserRouter>
        </FormNewProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
