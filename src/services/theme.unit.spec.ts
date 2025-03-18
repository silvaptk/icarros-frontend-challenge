import { vi, describe, test, expect, beforeEach } from 'vitest'
import {
  getBorder,
  getColor,
  getFontSize,
  getGradient,
  getSpace,
  getTheme,
} from './theme'

beforeEach(() => vi.clearAllMocks())

describe('Theme service unit tests', () => {
  describe('`getTheme` function', () => {
    test('that it does not throw', () => {
      expect(() => getTheme()).not.toThrow()
    })
  })

  describe('`getSpace` getter function', () => {
    test('that it properly fetches the space value', () => {
      const spaceKeys = Object.keys(getTheme().spaces)
      const key = spaceKeys[
        Math.random() * spaceKeys.length
      ] as keyof ReturnType<typeof getTheme>['spaces']

      const theme = getTheme()

      expect(getSpace(key)({ theme })).toBe(theme.spaces[key])
    })
  })

  describe('`getFontSize` getter function', () => {
    test('that it properly fetches the font size value', () => {
      const fontSizeKeys = Object.keys(getTheme().fontSizes)
      const key = fontSizeKeys[
        Math.random() * fontSizeKeys.length
      ] as keyof ReturnType<typeof getTheme>['fontSizes']

      const theme = getTheme()

      expect(getFontSize(key)({ theme })).toBe(theme.fontSizes[key])
    })
  })

  describe('`getBorder` getter function', () => {
    test('that it properly fetches the font size value', () => {
      const borderKeys = Object.keys(getTheme().borders)
      const key = borderKeys[
        Math.random() * borderKeys.length
      ] as keyof ReturnType<typeof getTheme>['borders']

      const theme = getTheme()

      expect(getBorder(key)({ theme })).toBe(theme.borders[key])
    })
  })

  describe('`getColor` getter function', () => {
    test('that it properly fetches the font size value', () => {
      const colorKeys = Object.keys(getTheme().colors)
      const key = colorKeys[
        Math.random() * colorKeys.length
      ] as keyof ReturnType<typeof getTheme>['colors']

      const theme = getTheme()

      expect(getColor(key)({ theme })).toBe(theme.colors[key])
    })
  })

  describe('`getGradient` getter function', () => {
    test('that it properly fetches the font size value', () => {
      const gradientKeys = Object.keys(getTheme().gradients)
      const key = gradientKeys[
        Math.random() * gradientKeys.length
      ] as keyof ReturnType<typeof getTheme>['gradients']

      const theme = getTheme()

      expect(getGradient(key)({ theme })).toBe(theme.gradients[key])
    })
  })
})
