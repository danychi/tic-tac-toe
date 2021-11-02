import { ButtonStateType } from '../reducers/button'
import { Action } from '../types'

const BUTTON_ACTIONS = {
  SET_BUTTON_STATE: 'SET_BUTTON_STATE',
}

const setButtonState = (
  buttonState: ButtonStateType,
): Action<ButtonStateType> => ({
  type: BUTTON_ACTIONS.SET_BUTTON_STATE,
  payload: buttonState,
})

export { BUTTON_ACTIONS, setButtonState }
