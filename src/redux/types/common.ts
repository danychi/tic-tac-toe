import type { Action as ReduxAction } from 'redux'

/**
 * https://github.com/acdlite/flux-standard-action
 */
interface Action<T> extends ReduxAction<string> {
  type: string
  payload?: T
  error?: boolean
  meta?: unknown
}

export { Action }
