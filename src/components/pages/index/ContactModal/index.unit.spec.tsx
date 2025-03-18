import { describe, test, expect, vi, beforeEach } from 'vitest'

import { render, screen } from '@/test/utils'
import ContactModal from '.'
import useContactModalStore from '@/stores/contact-modal'
import getPostMock from '@/test/mocks/post'
import userEvent from '@testing-library/user-event'
import { ComponentProps } from 'react'

beforeEach(() => vi.clearAllMocks())

vi.mock('@/stores/contact-modal', () => ({
  default: vi.fn().mockReturnValue({}),
}))
vi.mock('@/components/common/Button', () => ({
  default: (props: ComponentProps<'button'>) => <button {...props} />,
}))

describe('`ContactModal` component unit tests', () => {
  test('renders without throwing', () => {
    expect(() => render(<ContactModal />)).not.toThrow()
  })

  test('renders nothing if the visibility flag is not set in the store', () => {
    const mockedHook = vi.mocked(useContactModalStore)
    mockedHook.mockReturnValue({ isVisible: false })

    render(<ContactModal />)

    expect(screen.queryByTestId('modal-backdrop')).toBe(null)
  })

  test('does not render the modal main content if no data is provided', () => {
    const mockedHook = vi.mocked(useContactModalStore)
    mockedHook.mockReturnValue({ isVisible: true, data: null })

    render(<ContactModal />)

    expect(screen.queryByTestId('modal-backdrop')).not.toBe(null)
    expect(screen.queryByTestId('modal-title')).not.toBe(null)
    expect(screen.queryByTestId('modal-subtitle')).toBe(null)
    expect(screen.queryByTestId('modal-contact-data')).toBe(null)
  })

  test('renders the car brand properly when it is provided', () => {
    const postMock = getPostMock()
    const mockedHook = vi.mocked(useContactModalStore)
    mockedHook.mockReturnValue({ isVisible: true, data: postMock })

    render(<ContactModal />)

    const subtitleContent = screen.queryByTestId('modal-subtitle')?.textContent
    expect(subtitleContent).toContain(postMock.car.brand)
  })

  test('renders the car model properly when it is provided', () => {
    const postMock = getPostMock()
    const mockedHook = vi.mocked(useContactModalStore)
    mockedHook.mockReturnValue({ isVisible: true, data: postMock })

    render(<ContactModal />)

    const subtitleContent = screen.queryByTestId('modal-subtitle')?.textContent
    expect(subtitleContent).toContain(postMock.car.model)
  })

  test('renders the author name properly when it is provided', () => {
    const postMock = getPostMock()
    const mockedHook = vi.mocked(useContactModalStore)
    mockedHook.mockReturnValue({ isVisible: true, data: postMock })

    render(<ContactModal />)

    const contactContent =
      screen.queryByTestId('modal-contact-data')?.textContent
    expect(contactContent).toContain(postMock.author.name)
  })

  test('renders the author phone properly when it is provided', () => {
    const postMock = getPostMock()
    const mockedHook = vi.mocked(useContactModalStore)
    mockedHook.mockReturnValue({ isVisible: true, data: postMock })

    render(<ContactModal />)

    const contactContent =
      screen.queryByTestId('modal-contact-data')?.textContent
    expect(contactContent).toContain(postMock.author.phone)
  })

  test('renders the author email properly when it is provided', () => {
    const postMock = getPostMock()
    const mockedHook = vi.mocked(useContactModalStore)
    mockedHook.mockReturnValue({ isVisible: true, data: postMock })

    render(<ContactModal />)

    const contactContent =
      screen.queryByTestId('modal-contact-data')?.textContent
    expect(contactContent).toContain(postMock.author.email)
  })

  test('renders the author city properly when it is provided', () => {
    const postMock = getPostMock()
    const mockedHook = vi.mocked(useContactModalStore)
    mockedHook.mockReturnValue({ isVisible: true, data: postMock })

    render(<ContactModal />)

    const contactContent =
      screen.queryByTestId('modal-contact-data')?.textContent
    expect(contactContent).toContain(postMock.author.city)
  })

  test('renders the author state properly when it is provided', () => {
    const postMock = getPostMock()
    const mockedHook = vi.mocked(useContactModalStore)
    mockedHook.mockReturnValue({ isVisible: true, data: postMock })

    render(<ContactModal />)

    const contactContent =
      screen.queryByTestId('modal-contact-data')?.textContent
    expect(contactContent).toContain(postMock.author.state)
  })

  test('allows user to close the modal by clicking on the button to do so', async () => {
    const mockedHook = vi.mocked(useContactModalStore)
    const mockedHandler = vi.fn()
    mockedHook.mockReturnValue({ isVisible: true, hide: mockedHandler })

    render(<ContactModal />)

    await userEvent.click(screen.getByText('fechar'))

    expect(mockedHandler).toHaveBeenCalledTimes(1)
  })
})
