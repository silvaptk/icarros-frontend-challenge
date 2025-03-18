import { vi } from 'vitest'
import { UseQueryResult, useQuery } from 'react-query'
import IPost from '@/domain/Post'

function getUseQueryResult(
  overrides: Partial<UseQueryResult<unknown, unknown>>,
) {
  return { ...overrides } as UseQueryResult<unknown, unknown>
}

export function mockUseQuery(data?: IPost[], isLoading?: boolean) {
  const mockedReturnValue = {
    data: data || [],
    isLoading: isLoading ? (true as const) : (false as const),
  } as Partial<UseQueryResult<unknown, unknown>>

  const useQueryMock = vi.mocked(useQuery)

  useQueryMock.mockReturnValue(getUseQueryResult(mockedReturnValue))

  return { mockedReturnValue, useQueryMock }
}
