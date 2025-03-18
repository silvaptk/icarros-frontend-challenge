import { describe, test, expect, vi, beforeEach } from 'vitest'

import { render, screen } from '@/test/utils'
import PostItem from '.'
import getPostMock from '@/test/mocks/post'
import PostItemCarousel from '../PostItemCarousel'
import FavoriteIcon from '@/assets/icons/favorite.svg?react'
import FavoriteFilledIcon from '@/assets/icons/favorite-filled.svg?react'
import userEvent from '@testing-library/user-event'
import useContactModalStore from '@/stores/contact-modal'
import usePostLike from '@/hooks/data/usePostLike'
import { formatPrice, limitLength } from '@/services/format'
import Button from '@/components/common/Button'

beforeEach(() => vi.clearAllMocks())

vi.mock('@/services/format')
vi.mock('../PostItemCarousel')
vi.mock('@/components/common/Button', () => ({ default: vi.fn() }))
vi.mock('@/stores/contact-modal', () => ({
  default: vi.fn().mockReturnValue({ show: vi.fn() }),
}))
vi.mock('@/hooks/data/usePostLike', () => ({
  default: vi.fn().mockReturnValue({ execute: vi.fn() }),
}))
vi.mock('@/assets/icons/favorite.svg?react')
vi.mock('@/assets/icons/favorite-filled.svg?react')

describe('`PostItem` component unit tests', () => {
  test('renders without throwing', () => {
    expect(() => render(<PostItem data={getPostMock()} />)).not.toThrow()
  })

  test('forwards the images given to the `PostItemCarousel` component', () => {
    const PostItemCarouselMock = vi.mocked(PostItemCarousel)
    const postMock = getPostMock()

    render(<PostItem data={postMock} />)

    expect(PostItemCarouselMock).toHaveBeenCalledTimes(1)
    expect(PostItemCarouselMock).toHaveBeenCalledWith(
      { images: postMock.images },
      undefined,
    )
  })

  test('displays the post title properly', () => {
    const postMock = getPostMock()

    render(<PostItem data={postMock} />)

    expect(screen.queryByText(postMock.title)).not.toBeNull()
  })

  test('displays the car model properly', () => {
    const postMock = getPostMock()

    render(<PostItem data={postMock} />)

    expect(screen.queryByText(postMock.car.model)).not.toBeNull()
  })

  test('lets the button to like the post inactive if post was not liked yet', () => {
    const postMock = getPostMock()
    const FavoriteIconMocked = vi.mocked(FavoriteIcon)
    const FavoriteFilledIconMocked = vi.mocked(FavoriteFilledIcon)

    render(<PostItem data={postMock} />)

    const likeButton = screen.getByTestId('like-button')

    expect(Array.from(likeButton.classList)).not.toContain('active')
    expect(FavoriteFilledIconMocked).not.toHaveBeenCalledTimes(1)
    expect(FavoriteIconMocked).toHaveBeenCalled()
  })

  test('lets the button to like the post active if it was already liked', () => {
    const postMock = getPostMock()
    postMock.isLiked = true
    const FavoriteIconMocked = vi.mocked(FavoriteIcon)
    const FavoriteFilledIconMocked = vi.mocked(FavoriteFilledIcon)

    render(<PostItem data={postMock} />)

    const likeButton = screen.getByTestId('like-button')
    expect(Array.from(likeButton.classList)).toContain('active')
    expect(FavoriteIconMocked).not.toHaveBeenCalledTimes(1)
    expect(FavoriteFilledIconMocked).toHaveBeenCalled()
  })

  test('calls the function provided by the post like hook when the button to do so is clicked', async () => {
    const mockedHandler = vi.fn()
    vi.mocked(usePostLike).mockReturnValue({
      execute: mockedHandler,
      isLoading: false,
    })
    const postMock = getPostMock()

    render(<PostItem data={postMock} />)
    await userEvent.click(screen.getByTestId('like-button'))

    expect(mockedHandler).toHaveBeenCalledTimes(1)
    expect(mockedHandler).toHaveBeenCalledWith({
      id: postMock.id,
      isLiked: !postMock.isLiked,
    })
  })

  test('disable the button to like a post when the post like hook loading flag is set', async () => {
    const mockedHandler = vi.fn()
    vi.mocked(usePostLike).mockReturnValue({
      execute: mockedHandler,
      isLoading: true,
    })
    const postMock = getPostMock()

    render(<PostItem data={postMock} />)

    const likeButton = screen.getByTestId('like-button')
    expect(likeButton).toBeDisabled()
  })

  test('displays the car price properly formatted', () => {
    const formattedPrice = 'DUMMY_PRICE'
    vi.mocked(formatPrice).mockReturnValue(formattedPrice)

    render(<PostItem data={getPostMock()} />)

    expect(screen.queryByText(formattedPrice)).not.toBeNull()
  })

  test('displays the author name properly formatted', () => {
    const authorName = 'LIMITED_AUTHOR_NAME'
    vi.mocked(limitLength).mockReturnValue(authorName)

    render(<PostItem data={getPostMock()} />)

    expect(screen.queryByText(authorName)).not.toBeNull()
  })

  test('displays the author location properly formatted', () => {
    const postMock = getPostMock()
    const authorCity = 'LIMITED_AUTHOR_CITY'
    const authorLocation = `${authorCity}, ${postMock.author.state}`
    vi.mocked(limitLength).mockReturnValue(authorCity)

    render(<PostItem data={postMock} />)

    expect(screen.queryByText(authorLocation)).not.toBeNull()
  })

  test('displays the car year properly', () => {
    const postMock = getPostMock()
    const carYear = `${postMock.car.modelYear}/${postMock.car.productionYear}`

    render(<PostItem data={postMock} />)

    expect(screen.queryByText(carYear)).not.toBeNull()
  })

  test('forward the function to close the modal to the `Button` component', async () => {
    const handlerMock = vi.fn()
    vi.mocked(useContactModalStore).mockReturnValue({ show: handlerMock })
    const ButtonMock = vi.mocked(Button)

    render(<PostItem data={getPostMock()} />)
    ButtonMock.mock.calls[0][0].onClick?.()

    expect(handlerMock).toHaveBeenCalledTimes(1)
  })
})
