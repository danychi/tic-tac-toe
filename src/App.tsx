import React, { FC } from 'react'
import type { Dispatch } from 'redux'
import { hot } from 'react-hot-loader/root'
import GlobalStyles from './global-styles'
import { Header } from './components/Header'
import { TicTacToe } from './components/TicTacToe'
import { DEFAULT_NUMBER_OF_COLUMNS } from './constants'
import { connect } from 'react-redux'
import type { ConnectedProps } from 'react-redux'
import { ButtonStateType } from './redux/reducers/button'
import { setButtonState } from './redux/actions/button'
import { RootState } from './redux/reducers'

const App: FC<PropsFromRedux> = ({ buttonState, setButtonState }) => {
  return (
    <>
      <GlobalStyles />
      <Header />
      {/* TODO make number of columns adjustable */}
      <TicTacToe
        numberOfColumns={DEFAULT_NUMBER_OF_COLUMNS}
        buttonState={buttonState}
        setButtonState={setButtonState}
      />
    </>
  )
}

const mapStateToProps = ({ buttonState }: RootState) => ({
  buttonState,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setButtonState: (buttonState: ButtonStateType) =>
    dispatch(setButtonState(buttonState)),
})

type PropsFromRedux = ConnectedProps<typeof connector>

const connector = connect(mapStateToProps, mapDispatchToProps)

const AppWithState = connector(App)

export default hot(AppWithState)
