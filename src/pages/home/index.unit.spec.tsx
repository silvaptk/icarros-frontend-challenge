import { describe, test, expect, vi, beforeEach } from 'vitest'

import { render, waitFor } from '@/test/utils'
import HomePage from '.'
import usePosts from '@/hooks/data/usePosts'
import IPost from '@/domain/Post'
import getPostMock from '@/test/mocks/post'
import PostsList from '@/components/pages/index/PostsList'
import Header from '@/components/layout/Header'

vi.mock('@/hooks/data/usePosts', () => ({
  default: vi.fn().mockReturnValue({}),
}))
vi.mock('@/components/layout/Header')
vi.mock('@/components/pages/index/PostsList')
vi.mock('@/components/pages/index/ContactModal')

beforeEach(() => vi.clearAllMocks())

function mockUsePosts(posts: IPost[], areLoading: boolean) {
  vi.mocked(usePosts).mockReturnValue({
    posts,
    postsAreLoading: areLoading,
  })
}

describe('`HomePage` component unit tests', () => {
  test('renders without throwing', () => {
    expect(() => render(<HomePage />)).not.toThrow()
  })

  test('forwards the posts gotten from the data hook to the `PostsList` component', async () => {
    const postsMock = [getPostMock()]
    mockUsePosts(postsMock, false)

    render(<HomePage />)

    expect(PostsList).toHaveBeenCalledTimes(1)
    expect(PostsList).toHaveBeenCalledWith(
      expect.objectContaining({ data: postsMock }),
      undefined,
    )
  })

  test('set `PostsList` loading flag whenever the header input changes', async () => {
    const postsMock = [getPostMock()]
    mockUsePosts(postsMock, false)

    render(<HomePage />)

    vi.mocked(Header).mock.calls[0][0].onSearchChange?.('TEST')

    await waitFor(() => {
      expect(PostsList).toHaveBeenCalledWith(
        expect.objectContaining({ isLoading: true }),
        undefined,
      )
    })
  })

  test('forwards the search text gotten from the header input to the data hook', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const postsMock = [getPostMock()]
    mockUsePosts(postsMock, false)
    const brandSearchText = 'TEST'

    render(<HomePage />)

    vi.mocked(Header).mock.calls[0][0].onSearchChange?.(brandSearchText)
    vi.advanceTimersByTime(1000)

    await waitFor(() => {
      expect(usePosts).toHaveBeenCalledWith({ brandSearchText })
    })

    vi.useRealTimers()
  })
})
