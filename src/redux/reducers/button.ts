import { GAME_MESSAGES } from '../../messages'
import { BUTTON_ACTIONS } from '../actions'
import { Action } from '../types'

type ButtonStateType = {
  readonly isVisible: boolean
  readonly text: string
}

const buttonInitialState: ButtonStateType = {
  isVisible: true,
  text: GAME_MESSAGES.startButton,
}

const buttonReducer = (
  state = buttonInitialState,
  action: Action<ButtonStateType>,
): ButtonStateType => {
  switch (action.type) {
    case BUTTON_ACTIONS.SET_BUTTON_STATE:
      return {
        ...state,
        ...(action.payload || {}),
      }
    default:
      return state
  }
}

export { ButtonStateType, buttonReducer, buttonInitialState }
