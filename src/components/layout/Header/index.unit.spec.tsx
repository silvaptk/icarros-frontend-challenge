import { describe, test, expect, vi, beforeEach } from 'vitest'

import { render } from '@/test/utils'
import Header from '.'
import SearchInput from '../../common/SearchInput'

beforeEach(() => vi.clearAllMocks())

vi.mock('../../common/SearchInput')

describe('`Header` component  tests', () => {
  test('renders without throwing', () => {
    expect(() => render(<Header />)).not.toThrow()
  })

  test('should forward the given handler to the search input component', () => {
    const handler = vi.fn()

    render(<Header onSearchChange={handler} />)
    const MockedSearchInput = vi.mocked(SearchInput)

    expect(MockedSearchInput).toHaveBeenCalledWith(
      {
        onChange: handler,
      },
      undefined,
    )
  })

  test('should not display the search input if the respective flag is set', () => {
    render(<Header searchIsHidden />)

    const MockedSearchInput = vi.mocked(SearchInput)

    expect(MockedSearchInput).not.toHaveBeenCalled()
  })
})
