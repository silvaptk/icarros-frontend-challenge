import React, { ReactElement } from 'react'
import { render, RenderOptions, cleanup } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { vi, afterEach } from 'vitest'

import { getTheme } from '@/services/theme'
import { QueryClient, QueryClientProvider } from 'react-query'

// eslint-disable-next-line react-refresh/only-export-components
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={getTheme()}>{children}</ThemeProvider>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

Object.defineProperty(window, 'scrollTo', { value: vi.fn() })
Object.defineProperty(HTMLElement.prototype, 'scrollTo', { value: vi.fn() })

afterEach(cleanup)

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'
export { customRender as render }
