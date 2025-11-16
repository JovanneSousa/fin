import { GlobalStyle } from './globalStyles'
import Login from './components/Login'
import { Provider } from 'react-redux'
import { store } from './Store'

function App() {

  return (
    <Provider store={store}>
    <GlobalStyle />
      <div className="container">
        <Login />
      </div>
    </Provider>
  )
}

export default App
