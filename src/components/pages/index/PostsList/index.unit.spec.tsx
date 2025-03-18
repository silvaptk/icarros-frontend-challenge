import { describe, test, expect, vi, beforeEach } from 'vitest'

import { render } from '@/test/utils'
import PostsList from '.'
import getPostMock from '@/test/mocks/post'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import NoContentFound from '@/components/common/NoContentFound'
import PostItem from '../PostItem'

vi.mock('../PostItem')
vi.mock('@/components/common/LoadingIndicator')
vi.mock('@/components/common/NoContentFound')

beforeEach(() => vi.clearAllMocks())

describe('`PostsList` component unit tests', () => {
  test('renders without throwing', () => {
    expect(() =>
      render(<PostsList data={[]} isLoading={false} />),
    ).not.toThrow()
  })

  test('displays the loading indicator if the respective flag is set', () => {
    render(<PostsList data={[]} isLoading={true} />)

    expect(vi.mocked(LoadingIndicator)).toHaveBeenCalledTimes(1)
  })

  test('does not display the loading indicator if the respective flag is set', () => {
    render(<PostsList data={[]} isLoading={false} />)

    expect(vi.mocked(LoadingIndicator)).not.toHaveBeenCalled()
  })

  test('does not render the no content found component if the loading flag is set', () => {
    render(<PostsList data={[]} isLoading={true} />)

    expect(vi.mocked(NoContentFound)).not.toHaveBeenCalled()
  })

  test('renders the no content found component if the posts array is empty and the loading flag is not set', async () => {
    render(<PostsList data={[]} isLoading={false} />)

    expect(vi.mocked(NoContentFound)).toHaveBeenCalledTimes(1)
  })

  test('renders a post item for each item given', () => {
    const postMocks = [getPostMock()]

    render(<PostsList data={postMocks} isLoading={false} />)

    const PostItemMock = vi.mocked(PostItem)

    expect(PostItemMock).toHaveBeenCalledTimes(postMocks.length)
    for (const mock of postMocks) {
      expect(PostItemMock).toHaveBeenCalledWith({ data: mock }, undefined)
    }
  })
})
