import { GlobalStyle } from "./globalStyles";
import { Provider } from "react-redux";
import { store } from "./Store";
import { BrowserRouter } from "react-router-dom";
import Rotas from "./routes";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
          <Rotas />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
