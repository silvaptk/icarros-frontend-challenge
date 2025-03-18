import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import Button from '.'

describe('`Button` component unit tests', () => {
  test('renders without errors', async () => {
    expect(() => render(<Button />)).not.toThrow()
  })

  test('renders the children given through props', async () => {
    render(
      <Button>
        <div data-testid="given-children"></div>
      </Button>,
    )

    const children = screen.getByTestId('given-children')
    expect(children).toBeDefined()
  })

  test('calls the click handler given through props when the wrapper component is clicked', async () => {
    const givenHandler = vi.fn()

    render(<Button onClick={givenHandler}>MY_BUTTON</Button>)
    const button = screen.getByText('MY_BUTTON')
    button.click()

    expect(givenHandler).toHaveBeenCalledTimes(1)
  })
})
