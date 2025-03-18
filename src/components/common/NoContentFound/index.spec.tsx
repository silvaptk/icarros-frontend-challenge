import { render, screen } from '@/test/utils'
import { describe, test, expect } from 'vitest'
import NoContentFound from '.'

describe('`NoContentFound` component unit tests', () => {
  const title = 'DUMMY_TITLE'
  const description = 'DUMMY_DESCRIPTION'

  test('renders without throwing', async () => {
    expect(() =>
      render(<NoContentFound title={title} description={description} />),
    ).not.toThrow()
  })

  test('renders the provided title', async () => {
    render(<NoContentFound title={title} description={description} />)

    expect(screen.getByText(title)).toBeDefined()
  })

  test('renders the provided description', async () => {
    render(<NoContentFound title={title} description={description} />)

    expect(screen.getByText(description)).toBeDefined()
  })
})
