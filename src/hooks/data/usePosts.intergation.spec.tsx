import { describe, test, expect, vi, beforeEach } from 'vitest'
import usePosts from './usePosts'
import { cleanup, renderHook, waitFor } from '@testing-library/react'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from 'react-query'
import { PropsWithChildren } from 'react'

beforeEach(() => {
  cleanup()
  vi.clearAllMocks()
})

vi.mock('react-router')

function Wrapper({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  )
}

describe('`usePosts` data hook integration tests', () => {
  describe('integration with API service', () => {
    test('allows GET request to be sent', async () => {
      const client = axios.create()
      const getSpy = vi.spyOn(client, 'get')
      getSpy.mockReturnValue(Promise.resolve([]))
      vi.spyOn(axios, 'create').mockReturnValue(client)

      renderHook(() => usePosts({ brandSearchText: '' }), { wrapper: Wrapper })

      await waitFor(() => {
        expect(getSpy).toHaveBeenCalledTimes(1)
      })
    })
  })
})
