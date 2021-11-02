import { combineReducers } from 'redux'
import { buttonReducer, ButtonStateType } from './button'

type RootState = {
  buttonState: ButtonStateType
}

const rootReducer = combineReducers({
  buttonState: buttonReducer,
})

export { rootReducer, RootState }
