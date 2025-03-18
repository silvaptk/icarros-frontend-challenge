import * as Sentry from '@sentry/react'

export function setupLogging() {
  Sentry.init({
    dsn: import.meta.env.SENTRY_DSN,
  })
}

export function handleException(error: Error) {
  Sentry.captureException(error)
}
