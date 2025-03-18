import { vi, describe, test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

import { render, screen } from '@/test/utils'
import SearchInput from '.'
import { beforeEach } from 'node:test'
import { preventSubmission } from '@/utils/events'

vi.mock('@/utils/events', () => ({ preventSubmission: vi.fn() }))

beforeEach(() => vi.clearAllMocks())

describe('`SearchInput` component unit tests', () => {
  test('renders without throwing', async () => {
    expect(() => render(<SearchInput />)).not.toThrow()
  })

  test('prevent default behavior when form is submitted', async () => {
    render(<SearchInput />)
    const input = screen.getByTestId('search-input')
    await userEvent.type(input, '{enter}')

    expect(preventSubmission).toHaveBeenCalledTimes(1)
  })

  test('calls the provided handler function when the input value changes', async () => {
    const text = 'DUMMY_TEXT'
    const handler = vi.fn()

    render(<SearchInput onChange={handler} />)
    const input = screen.getByTestId('search-input')
    await userEvent.type(input, text)

    expect(handler).toHaveBeenCalledTimes(text.length)
    expect(handler).toHaveBeenCalledWith(text)
  })
})
