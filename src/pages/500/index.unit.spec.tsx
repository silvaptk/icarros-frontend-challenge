import { describe, test, expect, vi, beforeEach } from 'vitest'

import { render, screen } from '@/test/utils'
import ErrorPage from '.'
import Button from '@/components/common/Button'
import { ComponentProps } from 'react'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router'

vi.mock('react-router')
vi.mock('@/components/common/Button')
vi.mock('@/components/common/NoContentFound')
vi.mock('@/components/layout/Header')

beforeEach(() => vi.clearAllMocks())

describe('`ErrorPage` component unit tests', () => {
  test('renders without throwing', () => {
    expect(() => render(<ErrorPage />)).not.toThrow()
  })

  test('allows user to navigate away by clicking on the button', async () => {
    vi.mocked(Button).mockImplementation((props: ComponentProps<'button'>) => (
      <button {...props} />
    ))
    const navigateMock = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(navigateMock)

    render(<ErrorPage />)
    await userEvent.click(screen.getByText('recarregar página'))

    expect(navigateMock).toHaveBeenCalledTimes(1)
    expect(navigateMock).toHaveBeenCalledWith('/')
  })
})
