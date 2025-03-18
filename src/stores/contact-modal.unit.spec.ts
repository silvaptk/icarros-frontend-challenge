import { act, renderHook } from '@testing-library/react'
import { vi, describe, test, beforeEach, expect } from 'vitest'
import useContactModalStore from './contact-modal'
import getPostMock from '@/test/mocks/post'

beforeEach(() => vi.clearAllMocks())

describe('Contact Modal store unit tests', () => {
  test('does not throw when called', () => {
    expect(() => renderHook(() => useContactModalStore())).not.toThrow()
  })

  test('updates the data when the show action is called', () => {
    const data = getPostMock()

    const { result } = renderHook(() => useContactModalStore())
    act(() => {
      result.current.show(data)
    })

    expect(result.current.data).toEqual(data)
  })

  test('updates the visibility flag when the show action is called', () => {
    const { result } = renderHook(() => useContactModalStore())
    act(() => {
      result.current.show(getPostMock())
    })

    expect(result.current.isVisible).toEqual(true)
  })

  test('updates the data when the hide action is called', () => {
    const { result } = renderHook(() => useContactModalStore())
    act(() => {
      result.current.show(getPostMock())
    })
    act(() => {
      result.current.hide()
    })

    expect(result.current.data).toEqual(null)
  })

  test('updates the visibility flag when the hide action is called', () => {
    const { result } = renderHook(() => useContactModalStore())
    act(() => {
      result.current.show(getPostMock())
    })
    act(() => {
      result.current.hide()
    })

    expect(result.current.isVisible).toEqual(false)
  })
})
