import { vi, describe, test, expect, beforeEach } from 'vitest'
import { showErrorToast } from './toast'
import { toast } from 'react-toastify'
import ErrorNotification from '@/components/layout/ErrorNotification'

vi.mock('react-toastify', () => ({ toast: { error: vi.fn() } }))
vi.mock('@/components/layout/ErrorNotification')

beforeEach(() => vi.clearAllMocks())

describe('Toast service unit tests', () => {
  describe('`showErrorToast` function', () => {
    test('calls the `error` function from `react-toastify`', () => {
      showErrorToast('', '')

      expect(toast.error).toHaveBeenCalledTimes(1)
    })

    test('forwards the `ErrorNotification` component to the function', () => {
      showErrorToast('', '')

      expect(toast.error).toHaveBeenCalledWith(
        ErrorNotification,
        expect.objectContaining({}),
      )
    })

    test('forwards the given title and content to the function', () => {
      const data = { title: 'TITLE', content: 'CONTENT' }

      showErrorToast(data.title, data.content)

      expect(toast.error).toHaveBeenCalledWith(
        ErrorNotification,
        expect.objectContaining({ data }),
      )
    })
  })
})
