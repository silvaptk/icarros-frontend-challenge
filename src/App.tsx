import { StrictMode } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router'

import HomePage from './pages/home'
import Redirect from './components/util/Redirect'
import { getTheme } from './services/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import ErrorPage from './pages/500'

const client = new QueryClient()

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={getTheme()}>
          <BrowserRouter>
            <Routes>
              <Route index element={<HomePage />} />

              <Route path="/500" element={<ErrorPage />} />

              <Route path="/*" element={<Redirect />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}

export default App
