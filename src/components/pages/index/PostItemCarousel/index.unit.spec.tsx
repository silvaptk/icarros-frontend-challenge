import { describe, test, expect, vi, beforeEach } from 'vitest'

import { render, screen } from '@/test/utils'
import PostItemCarousel from '.'
import userEvent from '@testing-library/user-event'

beforeEach(() => vi.clearAllMocks())

describe('`PostItemCarousel` component unit tests', () => {
  test('renders without throwing', () => {
    expect(() => render(<PostItemCarousel images={[]} />)).not.toThrow()
  })

  test('renders without throwing if image URLs are provided', () => {
    expect(() =>
      render(<PostItemCarousel images={['/images/208-1.jpg']} />),
    ).not.toThrow()
  })

  test('displays an image element for each image URL given', () => {
    const imageURLs = ['/images/208-1.jpg', '/images/208-2.jpg']

    render(<PostItemCarousel images={imageURLs} />)

    const images = screen.getAllByTestId('post-item-carousel-image')

    for (const image of images) {
      expect(image.getAttribute('src')).toBeOneOf(imageURLs)
    }
  })

  test('disables the button to scroll to the left if the active image is the first one', () => {
    const imageURLs = ['/images/208-1.jpg', '/images/208-2.jpg']

    render(<PostItemCarousel images={imageURLs} />)

    const button = screen.getByTestId('post-item-carousel-scroll-left-button')

    expect(button).toBeDisabled()
  })

  test('disables the button to scroll to the right if the active image is the last one', async () => {
    const imageURLs = ['/images/208-1.jpg', '/images/208-2.jpg']

    render(<PostItemCarousel images={imageURLs} />)
    const button = screen.getByTestId('post-item-carousel-scroll-right-button')
    await userEvent.click(button)

    expect(button).toBeDisabled()
  })

  test('properly displays the amount of images available', async () => {
    const imageURLs = ['/images/208-1.jpg', '/images/208-2.jpg']

    render(<PostItemCarousel images={imageURLs} />)

    const imagesAvailable = screen.getByTestId(
      'post-item-carousel-images-length',
    )

    expect(imagesAvailable.textContent).toContain(imageURLs.length.toString())
  })

  test('properly updates the active image number if the button to scroll to the left is clicked', async () => {
    const imageURLs = ['/images/208-1.jpg', '/images/208-2.jpg']

    render(<PostItemCarousel images={imageURLs} />)
    await userEvent.click(
      screen.getByTestId('post-item-carousel-scroll-right-button'),
    )

    const activeImage = screen.getByTestId('post-item-carousel-active-image')
    expect(activeImage.textContent).toBe(imageURLs.length.toString())
  })

  test('properly updates the active image number if the button to scroll to the right is clicked', async () => {
    const imageURLs = ['/images/208-1.jpg', '/images/208-2.jpg']

    render(<PostItemCarousel images={imageURLs} />)
    await userEvent.click(
      screen.getByTestId('post-item-carousel-scroll-right-button'),
    )
    await userEvent.click(
      screen.getByTestId('post-item-carousel-scroll-left-button'),
    )

    const activeImage = screen.getByTestId('post-item-carousel-active-image')
    expect(activeImage.textContent).toBe('1')
  })

  test('properly scrolls the list if the button to scroll to the left is clicked', async () => {
    const imageURLs = ['/images/208-1.jpg', '/images/208-2.jpg']
    const mockedScrollMethod = vi.mocked(HTMLElement.prototype.scrollTo)

    render(<PostItemCarousel images={imageURLs} />)
    const list = screen.getByTestId('post-item-carousel-images-list')
    await userEvent.click(
      screen.getByTestId('post-item-carousel-scroll-right-button'),
    )
    mockedScrollMethod.mockClear()
    await userEvent.click(
      screen.getByTestId('post-item-carousel-scroll-left-button'),
    )

    expect(list).toBeOneOf(mockedScrollMethod.mock.instances)
  })

  test('properly scrolls the list if the button to scroll to the right is clicked', async () => {
    const imageURLs = ['/images/208-1.jpg', '/images/208-2.jpg']
    const mockedScrollMethod = vi.mocked(HTMLElement.prototype.scrollTo)

    render(<PostItemCarousel images={imageURLs} />)
    const list = screen.getByTestId('post-item-carousel-images-list')
    mockedScrollMethod.mockClear()
    await userEvent.click(
      screen.getByTestId('post-item-carousel-scroll-right-button'),
    )

    expect(list).toBeOneOf(mockedScrollMethod.mock.instances)
  })
})
