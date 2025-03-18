import { render, screen } from '@/test/utils'
import { describe, test, expect } from 'vitest'
import ErrorNotification, { IErrorNotificationProps } from '.'

describe('`ErrorNotification` component', () => {
  const defaultProps: IErrorNotificationProps = {
    closeToast() {},
    toastProps: {
      isIn: true,
      toastId: 1,
      key: '',
      transition: () => null,
      closeToast: () => {},
      position: 'top-right',
      draggablePercent: 80,
      deleteToast: () => {},
      theme: '',
      type: 'error',
      collapseAll: () => {},
    },
    data: {
      title: 'DUMMY_TITLE',
      content: 'DUMMY_CONTENT',
    },
    isPaused: false,
  }

  test('should render without throwing', async () => {
    expect(() => render(<ErrorNotification {...defaultProps} />)).not.toThrow()
  })

  test('should render the provided title', async () => {
    render(<ErrorNotification {...defaultProps} />)

    expect(screen.getByText(defaultProps.data.title)).toBeDefined()
  })

  test('should render the provided description', async () => {
    render(<ErrorNotification {...defaultProps} />)

    expect(screen.getByText(defaultProps.data.content)).toBeDefined()
  })
})
