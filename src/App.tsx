import React, { FC } from 'react'
import { hot } from 'react-hot-loader/root'
import GlobalStyles from './global-styles'
import { Header } from './components/Header'
import { TicTacToe } from './components/TicTacToe'
import { DEFAULT_NUMBER_OF_COLUMNS } from './constants'

const App: FC = () => (
  <>
    <GlobalStyles />
    <Header />
    {/* TODO make number of columns adjustable */}
    <TicTacToe numberOfColumns={DEFAULT_NUMBER_OF_COLUMNS} />
  </>
)

export default hot(App)
