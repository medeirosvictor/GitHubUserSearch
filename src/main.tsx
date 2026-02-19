import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,   // 5 min — keep cached results fresh
            gcTime: 30 * 60 * 1000,      // 30 min — garbage collect after this
            refetchOnWindowFocus: false,
        },
    },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/GitHubUserSearch">
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
