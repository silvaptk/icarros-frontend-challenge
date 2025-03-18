import { describe, test, expect, vi, beforeEach } from 'vitest'
import usePostLike from './usePostLike'
import { cleanup, renderHook, waitFor } from '@testing-library/react'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from 'react-query'
import { PropsWithChildren } from 'react'
import { toast } from 'react-toastify'

vi.mock('react-toastify', () => ({ toast: { error: vi.fn() } }))

beforeEach(() => {
  cleanup()
  vi.clearAllMocks()
})

function Wrapper({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  )
}

describe('`usePostLike` data hook integration tests', () => {
  describe('integration with API service', () => {
    test('allows PATCH request to be sent', async () => {
      const client = axios.create()
      const patchSpy = vi.spyOn(client, 'patch')
      patchSpy.mockReturnValue(Promise.resolve())
      vi.spyOn(axios, 'create').mockReturnValue(client)

      const { result } = renderHook(() => usePostLike(), { wrapper: Wrapper })
      result.current.execute({ id: 1, isLiked: true })

      await waitFor(() => {
        expect(patchSpy).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('integration with toast service', () => {
    test('allows error notification to be rendered', async () => {
      const client = axios.create()
      const patchSpy = vi.spyOn(client, 'patch')
      patchSpy.mockReturnValue(Promise.reject())
      vi.spyOn(axios, 'create').mockReturnValue(client)

      const { result } = renderHook(() => usePostLike(), { wrapper: Wrapper })
      result.current.execute({ id: 1, isLiked: true })

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledTimes(1)
      })
    })
  })
})
