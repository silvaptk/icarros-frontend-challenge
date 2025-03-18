import { describe, test, expect, vi, beforeEach } from 'vitest'

import { render, screen } from '@/test/utils'
import ErrorPage from '.'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router'

vi.mock('react-router')
vi.mock('@/components/common/NoContentFound')
vi.mock('@/components/layout/Header')

beforeEach(() => vi.clearAllMocks())

describe('`ErrorPage` component integration tests', () => {
  describe('integration with `Button` component', () => {
    test('allows user to navigate away by clicking on the button', async () => {
      const navigateMock = vi.fn()
      vi.mocked(useNavigate).mockReturnValue(navigateMock)

      render(<ErrorPage />)
      await userEvent.click(screen.getByText('recarregar página'))

      expect(navigateMock).toHaveBeenCalledTimes(1)
      expect(navigateMock).toHaveBeenCalledWith('/')
    })
  })
})
