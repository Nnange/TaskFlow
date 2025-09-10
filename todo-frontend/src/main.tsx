import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRouter } from './Approuter'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

createRoot(document.getElementById('root')! as HTMLElement).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
)
