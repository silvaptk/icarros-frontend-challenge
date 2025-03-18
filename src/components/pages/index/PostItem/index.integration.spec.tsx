import { describe, test, expect, vi, beforeEach } from 'vitest'

import { render, screen } from '@/test/utils'
import PostItem from '.'
import getPostMock from '@/test/mocks/post'
import userEvent from '@testing-library/user-event'
import useContactModalStore from '@/stores/contact-modal'
import IPost from '@/domain/Post'
import { useEffect } from 'react'
import getApiClient from '@/services/api'
import axios from 'axios'

beforeEach(() => vi.clearAllMocks())

vi.mock('@/services/api', () => ({
  default: vi.fn().mockReturnValue({ patch: vi.fn() }),
}))

const ContactModalStoreChecker = ({
  callback,
}: {
  callback: (data: IPost) => void
}) => {
  const { data } = useContactModalStore()

  useEffect(() => {
    if (data) {
      callback(data)
    }
  }, [data, callback])

  return null
}

describe('`PostItem` component integration tests', () => {
  describe('integration with `formatKilometers`', () => {
    test('renders the car kilometers properly formatted', async () => {
      const postMock = getPostMock()
      postMock.car.kilometers = 123321

      render(<PostItem data={postMock} />)

      expect(screen.queryByText(/\s*123\.321 Km\s*/)).not.toBeNull()
    })
  })

  describe('integration with `formatPrice`', () => {
    test('renders the car price properly formatted', async () => {
      const postMock = getPostMock()
      postMock.car.price = 59990

      render(<PostItem data={postMock} />)

      expect(screen.queryByText(/\s*R\$ 59\.990,00\s*/)).not.toBeNull()
    })
  })

  describe('integration with `limitLength`', () => {
    test('renders the author name properly limited', () => {
      const postMock = getPostMock()
      postMock.author.name = 'Patrick Silva Souza'

      render(<PostItem data={postMock} />)

      expect(screen.queryByText(/\s*Patrick Si...\s*/)).not.toBeNull()
    })

    test('renders the author city properly limited', () => {
      const postMock = getPostMock()
      postMock.author.city = "Santa Bárbara d'Oeste"

      render(<PostItem data={postMock} />)

      expect(screen.queryByText(/.*Santa Bárb....*/)).not.toBeNull()
    })
  })

  describe('integration with `PostItemCarousel`', () => {
    test('renders the car images properly', () => {
      const postMock = getPostMock()
      postMock.images = [
        '/images/208-1.jpg',
        '/images/208-2.jpg',
        '/images/208-3.webp',
      ]

      render(<PostItem data={postMock} />)

      const images = screen.getAllByTestId('post-item-carousel-image')
      expect(images.length).toEqual(postMock.images.length)
      for (const image of images) {
        expect(image.getAttribute('src')).toBeOneOf(postMock.images)
      }
    })

    test('allows the user to scroll the images', async () => {
      const postMock = getPostMock()
      postMock.images = [
        '/images/208-1.jpg',
        '/images/208-2.jpg',
        '/images/208-3.webp',
      ]

      render(<PostItem data={postMock} />)

      expect(
        screen.getByTestId('post-item-carousel-images-length').textContent,
      ).toBe(postMock.images.length.toString())
      expect(
        screen.getByTestId('post-item-carousel-active-image').textContent,
      ).toContain(1)

      await userEvent.click(
        screen.getByTestId('post-item-carousel-scroll-right-button'),
      )

      expect(
        screen.getByTestId('post-item-carousel-active-image').textContent,
      ).toContain(2)

      await userEvent.click(
        screen.getByTestId('post-item-carousel-scroll-right-button'),
      )

      expect(
        screen.getByTestId('post-item-carousel-active-image').textContent,
      ).toContain(3)

      await userEvent.click(
        screen.getByTestId('post-item-carousel-scroll-left-button'),
      )

      expect(
        screen.getByTestId('post-item-carousel-active-image').textContent,
      ).toContain(2)

      await userEvent.click(
        screen.getByTestId('post-item-carousel-scroll-left-button'),
      )

      expect(
        screen.getByTestId('post-item-carousel-active-image').textContent,
      ).toContain(1)
    })
  })

  describe('integration with `Button`', () => {
    test('calls the function to show the contact modal when clicked', async () => {
      const callback = vi.fn()
      const postMock = getPostMock()

      render(
        <>
          <PostItem data={postMock} />
          <ContactModalStoreChecker callback={callback} />
        </>,
      )
      await userEvent.click(screen.getByText('contato'))

      expect(callback).toHaveBeenCalledTimes(1)
    })
  })

  describe('integration with `useContactModalStore`', () => {
    test('properly updates the store when the method to show the modal is called', async () => {
      const callback = vi.fn()
      const postMock = getPostMock()

      render(
        <>
          <PostItem data={postMock} />
          <ContactModalStoreChecker callback={callback} />
        </>,
      )
      await userEvent.click(screen.getByText('contato'))

      expect(callback).toHaveBeenCalledWith(postMock)
    })
  })

  describe('integration with `usePostLike`', () => {
    test('properly calls the API service when the button to like/unlike the post is clicked', async () => {
      const client = axios.create()
      const spy = vi.spyOn(client, 'patch').mockReturnValue(Promise.resolve())
      vi.mocked(getApiClient).mockReturnValue(client)
      const postMock = getPostMock()

      render(
        <>
          <PostItem data={postMock} />
        </>,
      )
      await userEvent.click(screen.getByTestId('like-button'))

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(`/posts/${postMock.id}`, {
        isLiked: !postMock.isLiked,
      })
    })
  })
})
