import { describe, test, expect, vi, beforeEach } from 'vitest'

import { render, waitFor } from '@/test/utils'
import HomePage from '.'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import NoContentFound from '@/components/common/NoContentFound'
import getPostMock from '@/test/mocks/post'
import PostItem from '@/components/pages/index/PostItem'
import getApiClient from '@/services/api'
import axios from 'axios'
import IPost from '@/domain/Post'
import SearchInput from '@/components/common/SearchInput'

beforeEach(() => vi.clearAllMocks())

vi.mock('react-router')
vi.mock('@/services/api')
vi.mock('@/components/pages/index/ContactModal')
vi.mock('@/components/pages/index/PostItem')
vi.mock('@/components/common/LoadingIndicator')
vi.mock('@/components/common/NoContentFound')
vi.mock('@/components/common/SearchInput')

function mockGetApiClient(
  promise: Promise<{ data: IPost[] }> = Promise.resolve({ data: [] }),
) {
  const client = axios.create()
  const spy = vi.spyOn(client, 'get').mockReturnValue(promise)
  const getApiClientMock = vi.mocked(getApiClient).mockReturnValue(client)

  return { spy, getApiClientMock }
}

describe('`HomePage` component integration tests', () => {
  test('renders without throwing', () => {
    mockGetApiClient()

    expect(() => render(<HomePage />)).not.toThrow()
  })

  describe('integration with `usePosts` data hook and `Header` component', () => {
    test('sends a GET request whenever the `Header` component calls the search input callback', async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true })
      const searchText = 'TEST'
      const { spy } = mockGetApiClient()

      render(<HomePage />)
      vi.mocked(SearchInput).mock.calls[0][0].onChange?.(searchText)
      vi.clearAllMocks()
      vi.advanceTimersByTime(1000)

      await waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(`/posts?car.brand_like=${searchText}`)
      })

      vi.useRealTimers()
    })
  })

  describe('integration with `PostsList` component', () => {
    test('renders a `LoadingIndicator` component while the posts are being fetched', async () => {
      mockGetApiClient()

      render(<HomePage />)

      await waitFor(() => {
        expect(LoadingIndicator).toHaveBeenCalled()
      })
    })

    test('renders a `NoContentFound` component if no posts were fetched', async () => {
      mockGetApiClient()

      render(<HomePage />)

      await waitFor(() => {
        expect(NoContentFound).toHaveBeenCalled()
      })
    })

    test('renders a `PostItem` component for each element in the posts array', async () => {
      const postMocks = [getPostMock()]

      mockGetApiClient(Promise.resolve({ data: postMocks }))

      render(<HomePage />)

      await waitFor(() => {
        for (const mock of postMocks) {
          expect(vi.mocked(PostItem)).toHaveBeenCalledWith(
            expect.objectContaining({ data: mock }),
            undefined,
          )
        }
      })
    })
  })
})
