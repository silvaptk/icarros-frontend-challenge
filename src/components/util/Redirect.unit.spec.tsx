import { describe, test, expect, vi, beforeEach } from 'vitest'

import { render } from '@/test/utils'
import Redirect from './Redirect'
import { useNavigate } from 'react-router'

beforeEach(() => vi.clearAllMocks())

vi.mock('react-router', () => ({
  useNavigate: vi.fn().mockReturnValue(vi.fn()),
}))

describe('`Redirect` component unit tests', () => {
  test('renders without throwing', () => {
    expect(() => render(<Redirect />)).not.toThrow()
  })

  test('calls the navigation function as soon as it gets rendered', () => {
    const navigationMock = vi.fn()
    const destination = '/destination'
    vi.mocked(useNavigate).mockReturnValue(navigationMock)

    render(<Redirect to={destination} />)

    expect(navigationMock).toHaveBeenCalledTimes(1)
    expect(navigationMock).toHaveBeenCalledWith(destination, { replace: true })
  })
})
