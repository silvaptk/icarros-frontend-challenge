import { describe, test, expect, vi, beforeEach } from 'vitest'

import usePosts from './usePosts'
import { cleanup, renderHook, waitFor } from '@testing-library/react'
import { QueryFunction, QueryOptions } from 'react-query'
import axios from 'axios'
import getApiClient from '@/services/api'
import IPost from '@/domain/Post'
import { useNavigate } from 'react-router'
import { mockUseQuery } from '@/test/mocks/useQuery'

beforeEach(() => {
  vi.clearAllMocks()
  cleanup()
})

vi.mock('@/services/api')
vi.mock('react-query', () => ({ useQuery: vi.fn().mockReturnValue({}) }))
vi.mock('react-router')

function mockGetApiClient(
  resultPromise: Promise<unknown> = Promise.resolve([]),
) {
  const client = axios.create()
  const getSpy = vi.spyOn(client, 'get').mockReturnValue(resultPromise)

  const getApiClientMock = vi.mocked(getApiClient)
  getApiClientMock.mockReturnValue(client)

  return { getSpy, getApiClientMock }
}

function mockUseNavigate() {
  const navigateMock = vi.fn()

  vi.mocked(useNavigate).mockReturnValue(navigateMock)

  return navigateMock
}

describe('`usePosts` data hook unit tests', () => {
  test('can be called without throwing', () => {
    expect(() => {
      renderHook(() => usePosts({ brandSearchText: '' }))
    }).not.toThrow()
  })

  test('returns the result of calling the `useQuery` hook', () => {
    const { mockedReturnValue } = mockUseQuery()

    const { result } = renderHook(() => usePosts({ brandSearchText: '' }))

    expect(result.current.posts).toEqual(mockedReturnValue.data)
    expect(result.current.postsAreLoading).toEqual(mockedReturnValue.isLoading)
  })

  describe('query function execution', () => {
    test('gets the API client from the service', async () => {
      const { useQueryMock } = mockUseQuery()
      const { getApiClientMock } = mockGetApiClient()

      renderHook(() => usePosts({ brandSearchText: '' }))
      const queryOptions = useQueryMock.mock.calls[0][0] as QueryOptions
      expect(queryOptions).toBeTruthy()
      const queryFunction = queryOptions.queryFn as QueryFunction
      expect(queryFunction).toBeTruthy()
      expect(queryFunction).toBeInstanceOf(Function)
      queryFunction({ queryKey: [''], meta: undefined })

      await waitFor(() => {
        expect(getApiClientMock).toHaveBeenCalledTimes(1)
      })
    })

    test('performs a GET request using the client gotten', async () => {
      const { useQueryMock } = mockUseQuery()
      const { getSpy } = mockGetApiClient()

      renderHook(() => usePosts({ brandSearchText: '' }))
      const queryOptions = useQueryMock.mock.calls[0][0] as QueryOptions
      const queryFunction = queryOptions.queryFn as QueryFunction
      queryFunction({ queryKey: [''], meta: undefined })

      waitFor(() => {
        expect(getSpy).toHaveBeenCalledTimes(1)
        expect(getSpy).toHaveBeenCalledWith('/posts')
      })
    })

    test('sends the brand search text in the request URL', async () => {
      const { useQueryMock } = mockUseQuery()
      const { getSpy } = mockGetApiClient()
      const brandSearchText = 'TEST'

      renderHook(() => usePosts({ brandSearchText }))
      const queryOptions = useQueryMock.mock.calls[0][0] as QueryOptions
      const queryFunction = queryOptions.queryFn as QueryFunction
      queryFunction({ queryKey: [''], meta: undefined })

      expect(getSpy).toHaveBeenCalledWith(
        `/posts?car.brand_like=${brandSearchText}`,
      )
    })

    test('returns the request data if it succeeds', async () => {
      const { useQueryMock } = mockUseQuery()
      const expectedResult: IPost[] = []
      mockGetApiClient(Promise.resolve({ data: expectedResult }))

      renderHook(() => usePosts({ brandSearchText: '' }))
      const queryOptions = useQueryMock.mock.calls[0][0] as QueryOptions
      const queryFunction = queryOptions.queryFn as QueryFunction
      const gottenResult = await queryFunction({
        queryKey: [''],
        meta: undefined,
      })

      expect(gottenResult).toEqual(expectedResult)
    })

    test('navigates to the 500 page if the request fails', async () => {
      const { useQueryMock } = mockUseQuery()
      mockGetApiClient(Promise.reject())
      const navigateMock = mockUseNavigate()

      renderHook(() => usePosts({ brandSearchText: '' }))
      const queryOptions = useQueryMock.mock.calls[0][0] as QueryOptions
      const queryFunction = queryOptions.queryFn as QueryFunction
      await queryFunction({
        queryKey: [''],
        meta: undefined,
      })

      expect(navigateMock).toHaveBeenCalledTimes(1)
      expect(navigateMock).toHaveBeenCalledWith('/500')
    })
  })
})
