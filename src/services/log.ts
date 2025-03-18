import * as Sentry from '@sentry/react'

export function setupLogging() {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    tracesSampleRate: 1.0, 
    environment: import.meta.env.VITE_APP_ENV || 'development',
    debug: true,
  })
}

export function handleException(error: Error) {
  Sentry.captureException(error)
}
