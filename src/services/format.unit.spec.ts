import { describe, test, expect } from 'vitest'
import { formatKilometers, formatPrice, limitLength } from './format'

function normalizeWhitespace(text: string) {
  return text.replace(/\s/g, ' ')
}

describe('Formatting service unit tests', () => {
  describe('Function to format prices', () => {
    test('properly format 0', () => {
      expect(normalizeWhitespace(formatPrice(0))).toEqual(
        normalizeWhitespace('R$ 0,00'),
      )
    })

    test('properly format 0.00001', () => {
      expect(normalizeWhitespace(formatPrice(0.00001))).toEqual(
        normalizeWhitespace('R$ 0,00'),
      )
    })

    test('properly format 10', () => {
      expect(normalizeWhitespace(formatPrice(10))).toEqual(
        normalizeWhitespace('R$ 10,00'),
      )
    })

    test('properly format 100', () => {
      expect(normalizeWhitespace(formatPrice(100))).toEqual(
        normalizeWhitespace('R$ 100,00'),
      )
    })

    test('properly format 1000', () => {
      expect(normalizeWhitespace(formatPrice(1000))).toEqual(
        normalizeWhitespace('R$ 1.000,00'),
      )
    })

    test('properly format 10000', () => {
      expect(normalizeWhitespace(formatPrice(10000))).toEqual(
        normalizeWhitespace('R$ 10.000,00'),
      )
    })

    test('properly format 100000', () => {
      expect(normalizeWhitespace(formatPrice(100000))).toEqual(
        normalizeWhitespace('R$ 100.000,00'),
      )
    })
  })

  describe('Function to format kilometers', () => {
    test('properly format 0', () => {
      expect(formatKilometers(0)).toBe('0 Km')
    })

    test('properly format 0.00001', () => {
      expect(formatKilometers(0.00001)).toBe('0 Km')
    })

    test('properly format 0.1', () => {
      expect(formatKilometers(0.1)).toBe('0 Km')
    })
    test('properly format 0.5', () => {
      expect(formatKilometers(0.5)).toBe('1 Km')
    })

    test('properly format 1', () => {
      expect(formatKilometers(1)).toBe('1 Km')
    })

    test('properly format 10', () => {
      expect(formatKilometers(10)).toBe('10 Km')
    })

    test('properly format 100', () => {
      expect(formatKilometers(100)).toBe('100 Km')
    })

    test('properly format 1000', () => {
      expect(formatKilometers(1000)).toBe('1.000 Km')
    })

    test('properly format 10000', () => {
      expect(formatKilometers(10000)).toBe('10.000 Km')
    })
    test('properly format 100000', () => {
      expect(formatKilometers(100000)).toBe('100.000 Km')
    })
  })

  describe('Function to limit length', () => {
    test('does not limit short strings', () => {
      expect(limitLength('a')).toBe('a')
    })
    test('does not limit strings whose length is on the limit', () => {
      expect(limitLength('aaaaaaaaaa')).toBe('aaaaaaaaaa')
    })

    test('limit strings whose length is the limit plus 1', () => {
      expect(limitLength('aaaaaaaaaaa')).toBe('aaaaaaaaaa...')
    })

    test('limit strings whose length is much more higher than the limit', () => {
      expect(limitLength(new Array(10e5).fill('a').join(''))).toBe(
        'aaaaaaaaaa...',
      )
    })
  })
})
