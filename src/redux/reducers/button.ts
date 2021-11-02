import { GAME_MESSAGES } from '../../messages'
import { BUTTON_ACTIONS } from '../actions'
import { Action } from '../types'

type ButtonStateType = {
  readonly isVisible: boolean
  readonly text: string
  readonly onClick?: () => unknown
}

const initialState: ButtonStateType = {
  isVisible: true,
  text: GAME_MESSAGES.startButton,
}

const buttonReducer = (
  state = initialState,
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

export { ButtonStateType, buttonReducer }
