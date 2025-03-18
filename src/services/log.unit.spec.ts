import { vi, describe, test, expect, beforeEach } from 'vitest'
import { setupLogging } from './log'
import { init } from '@sentry/react'

vi.mock('@sentry/react', () => ({ init: vi.fn() }))

beforeEach(() => vi.clearAllMocks())

describe('Log service unit tests', () => {
  describe('`setupLogging` function', () => {
    test('calls the `init` method from the Sentry library', () => {
      setupLogging()

      expect(init).toHaveBeenCalledTimes(1)
    })

    test('forwards the Sentry DSN to the `init` function', () => {
      const sentryDSN = 'DUMMY_DSN'
      import.meta.env.SENTRY_DSN = sentryDSN

      setupLogging()

      expect(init).toHaveBeenCalledWith({ dsn: sentryDSN })
    })
  })
})
