import { GlobalStyle } from "./globalStyles";
import { Provider } from "react-redux";
import { store } from "./Store";
import { BrowserRouter } from "react-router-dom";
import Rotas from "./routes";
import FormNewProvider from "./contexts/FormNew/FormNewProvider";

function App() {
  return (
    <Provider store={store}>
      <FormNewProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Rotas />
        </BrowserRouter>
      </FormNewProvider>
    </Provider>
  );
}

export default App;
