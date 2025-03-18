import { describe, test, expect, vi, beforeEach } from 'vitest'

import { render, screen, waitFor } from '@/test/utils'
import ContactModal from '.'
import useContactModalStore from '@/stores/contact-modal'
import getPostMock from '@/test/mocks/post'
import { useEffect } from 'react'
import userEvent from '@testing-library/user-event'

beforeEach(() => vi.clearAllMocks())

const ContactModalTrigger = () => {
  const { show } = useContactModalStore()

  useEffect(() => {
    show(getPostMock())
  }, [show])

  return null
}

const ContactModalCloser = () => {
  const { hide } = useContactModalStore()

  useEffect(() => {
    hide()
  }, [hide])

  return null
}

describe('`ContactModal` component integration tests', () => {
  describe('Integration with `useContactModalStore` hook', () => {
    test('the modal gets visible when the method to show it is called in the store', async () => {
      render(
        <>
          <ContactModalTrigger />
          <ContactModal />
        </>,
      )

      expect(screen.queryByTestId('modal-backdrop')).not.toBeNull()
      expect(screen.queryByTestId('modal-subtitle')).not.toBeNull()
      expect(screen.queryByTestId('modal-contact-data')).not.toBeNull()
    })

    test('the modal data gets updated when the method to show it is called in the store', async () => {
      const postMock = getPostMock()

      render(
        <>
          <ContactModalTrigger />
          <ContactModal />
        </>,
      )

      expect(screen.queryByTestId('modal-subtitle')?.textContent).toContain(
        postMock.car.brand,
      )
      expect(screen.queryByTestId('modal-subtitle')?.textContent).toContain(
        postMock.car.model,
      )
      expect(screen.queryByTestId('modal-contact-data')?.textContent).toContain(
        postMock.author.name,
      )
      expect(screen.queryByTestId('modal-contact-data')?.textContent).toContain(
        postMock.author.email,
      )
      expect(screen.queryByTestId('modal-contact-data')?.textContent).toContain(
        postMock.author.city,
      )
      expect(screen.queryByTestId('modal-contact-data')?.textContent).toContain(
        postMock.author.state,
      )
      expect(screen.queryByTestId('modal-contact-data')?.textContent).toContain(
        postMock.author.phone,
      )
    })

    test('the modal gets hidden when the method to hide it is called in the store', async () => {
      render(
        <>
          <ContactModalTrigger />
          <ContactModal />
          <ContactModalCloser />
        </>,
      )

      await waitFor(() => {
        expect(screen.queryByTestId('modal-backdrop')).toBeNull()
      })
    })
  })

  describe('Integration with `Button` component', async () => {
    test('allows user to hide the modal when clicked', async () => {
      render(
        <>
          <ContactModal />
          <ContactModalTrigger />
        </>,
      )

      await userEvent.click(screen.getByText('fechar'))

      await waitFor(() => {
        expect(screen.queryByTestId('modal-backdrop')).toBeNull()
      })
    })
  })
})
