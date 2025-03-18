import { vi, describe, test, expect, afterEach, beforeEach } from 'vitest'
import usePostLike from './usePostLike'
import { cleanup, renderHook, waitFor } from '@testing-library/react'
import {
  MutationFunction,
  QueryClient,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query'
import getApiClient from '@/services/api'
import axios from 'axios'
import { showErrorToast } from '@/services/toast'

vi.mock('@/services/api')
vi.mock('@/services/toast')
vi.mock('react-query', () => ({
  useMutation: vi.fn().mockReturnValue({}),
  useQueryClient: vi.fn().mockReturnValue({}),
  QueryClient: vi.fn().mockImplementation(() => ({
    invalidateQueries: vi.fn(),
  })),
}))

beforeEach(() => vi.clearAllMocks())
afterEach(() => cleanup())

function getMutationResult(
  overrides: Partial<UseMutationResult<unknown, unknown, unknown, unknown>>,
): UseMutationResult<unknown, unknown, unknown, unknown> {
  return {
    mutate: vi.fn(),
    mutateAsync: vi.fn(),
    reset: vi.fn(),
    status: 'success',
    data: null,
    error: null,
    isError: false,
    isIdle: false,
    isLoading: false,
    isSuccess: true,
    failureCount: 0,
    isPaused: false,
    variables: null,
    context: undefined,
    ...overrides,
  } as UseMutationResult<unknown, unknown, unknown, unknown>
}

function mockApiClient(promise = Promise.resolve()) {
  const client = axios.create()
  const patchSpy = vi.spyOn(client, 'patch').mockImplementation(() => promise)
  vi.mocked(getApiClient).mockReturnValue(client)

  return patchSpy
}

function mockUseMutation() {
  const mock = vi.mocked(useMutation)
  mock.mockReturnValue(getMutationResult({}))
  return mock
}

function mockUseQueryClient() {
  const queryClient = new QueryClient()
  const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries')
  const useQueryClientMock = vi.mocked(useQueryClient)
  useQueryClientMock.mockReturnValue(queryClient)

  return invalidateQueriesSpy
}

describe('`usePostLike` data hook unit tests', () => {
  test('can be called without throwing', () => {
    expect(() => renderHook(usePostLike)).not.toThrow()
  })

  test('returns the mutation got from calling the `useMutation` hook', async () => {
    const expectedCallback = vi.fn()
    mockUseMutation().mockReturnValue(
      getMutationResult({ mutate: expectedCallback }),
    )

    const { result } = renderHook(usePostLike)

    expect(result.current.execute).toBe(expectedCallback)
  })

  test('returns the loading flag got from calling the `useMutation` hook', () => {
    const expectedFlagValue = false
    mockUseMutation().mockReturnValue(
      getMutationResult({ isLoading: expectedFlagValue }),
    )

    const { result } = renderHook(usePostLike)

    expect(result.current.isLoading).toBe(expectedFlagValue)
  })

  describe('mutation execution', async () => {
    test('gets the API client from the service', async () => {
      const useMutationMock = mockUseMutation()

      renderHook(usePostLike)

      const mutationOptions = useMutationMock.mock
        .calls[0][0] as UseMutationOptions
      expect(mutationOptions).toBeTruthy()
      const mutationFunction = mutationOptions.mutationFn as MutationFunction<{
        id: number
        isLiked: boolean
      }>
      expect(mutationFunction).toBeTruthy()
      expect(mutationFunction).toBeInstanceOf(Function)
      mutationFunction({ id: 1, isLiked: false })

      expect(vi.mocked(getApiClient)).toHaveBeenCalledTimes(1)
    })

    test('sends a PATCH request using the API client gotten from the service', () => {
      const patchSpy = mockApiClient()
      const useMutationMock = mockUseMutation()

      const mutationData = { id: 1, isLiked: false }

      renderHook(usePostLike)
      const mutationOptions = useMutationMock.mock
        .calls[0][0] as UseMutationOptions
      const mutationFunction = mutationOptions.mutationFn as MutationFunction<{
        id: number
        isLiked: boolean
      }>
      mutationFunction(mutationData)

      expect(patchSpy).toHaveBeenCalledTimes(1)
      expect(patchSpy).toHaveBeenCalledWith(`/posts/${mutationData.id}`, {
        isLiked: mutationData.isLiked,
      })
    })

    test('calls the query client to invalidate the posts query if the request succeeds', async () => {
      const mutationData = { id: 1, isLiked: false }
      const useMutationMock = mockUseMutation()
      const invalidateQueriesSpy = mockUseQueryClient()
      mockApiClient()

      renderHook(usePostLike)
      const mutationOptions = useMutationMock.mock
        .calls[0][0] as UseMutationOptions
      const mutationFunction = mutationOptions.mutationFn as MutationFunction<{
        id: number
        isLiked: boolean
      }>
      mutationFunction(mutationData)

      await waitFor(() => {
        expect(invalidateQueriesSpy).toHaveBeenCalledTimes(1)
        expect(invalidateQueriesSpy).toHaveBeenCalledWith('posts')
      })
    })

    test('uses the toast service to show an error notification if the request fails', async () => {
      const mutationData = { id: 1, isLiked: false }
      const useMutationMock = mockUseMutation()
      mockApiClient(Promise.reject())

      renderHook(usePostLike)
      const mutationOptions = useMutationMock.mock
        .calls[0][0] as UseMutationOptions
      const mutationFunction = mutationOptions.mutationFn as MutationFunction<{
        id: number
        isLiked: boolean
      }>
      mutationFunction(mutationData)

      await waitFor(() => {
        expect(showErrorToast).toHaveBeenCalledTimes(1)
      })
    })
  })
})
