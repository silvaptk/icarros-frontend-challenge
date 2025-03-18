import { describe, test, expect, vi, beforeEach } from 'vitest'

import { render, screen } from '@/test/utils'
import Header from '.'
import userEvent from '@testing-library/user-event'

beforeEach(() => vi.clearAllMocks())

describe('`Header` component integration tests', () => {
  describe('with `SearchInput` component', async () => {
    test('that the child component properly calls the handler given by the parent', async () => {
      const textToBeTyped = 'TEST'
      const handler = vi.fn()

      render(<Header onSearchChange={handler} />)
      await userEvent.type(screen.getByTestId('search-input'), textToBeTyped)

      expect(handler).toHaveBeenCalledTimes(textToBeTyped.length)
      expect(handler).toHaveBeenCalledWith(textToBeTyped)
    })
  })
})
