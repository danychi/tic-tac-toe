import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import * as React from 'react'
const template = require('lodash.template')
import { DEFAULT_NUMBER_OF_COLUMNS } from '../../constants'

import { TicTacToe } from '../TicTacToe'
import { buttonInitialState } from '../../redux/reducers/button'
import { GAME_MESSAGES } from '../../messages'
import { PlayType } from '../../enums'

describe('Tic Tac Toe intro', () => {
  it('should render the intro screen where it explains the rules of the game when the user has not done anything', () => {
    render(
      <TicTacToe
        numberOfColumns={DEFAULT_NUMBER_OF_COLUMNS}
        buttonState={buttonInitialState}
        setButtonState={jest.fn()}
      />,
    )
    screen.getByText(GAME_MESSAGES.intro)
    screen.getByText(GAME_MESSAGES.rulesTitle)
    screen.getByText(GAME_MESSAGES.rule1)
    screen.getByText(GAME_MESSAGES.rule2)
    screen.getByText(GAME_MESSAGES.rule3)
    screen.getByText(GAME_MESSAGES.rule4)
  })

  it('should render the "start" button', () => {
    render(
      <TicTacToe
        numberOfColumns={DEFAULT_NUMBER_OF_COLUMNS}
        buttonState={buttonInitialState}
        setButtonState={jest.fn()}
      />,
    )

    screen.getByText(GAME_MESSAGES.startButton)
  })

  it('should navigate to the "board" view when the start button is pressed', async () => {
    render(
      <TicTacToe
        numberOfColumns={DEFAULT_NUMBER_OF_COLUMNS}
        buttonState={buttonInitialState}
        setButtonState={jest.fn()}
      />,
    )

    const startButton = screen.getByText(GAME_MESSAGES.startButton)
    fireEvent.click(startButton)

    // We can verify that we're on the board view because the message to show who's next should be shown
    await waitFor(() =>
      screen.getByText(
        template(GAME_MESSAGES.nextTurn)({ player: PlayType.x }),
      ),
    )
  })
})

describe('Tic Tac Toe game', () => {
  const playerXWinsGame = () => {
    // Player X gets position 0
    const square0 = screen.getByTestId('square0')
    square0.click()

    // Player O gets position 3
    const square3 = screen.getByTestId('square3')
    square3.click()

    // Player X gets position1
    const square1 = screen.getByTestId('square1')
    square1.click()

    // Player O gets position 4
    const square4 = screen.getByTestId('square4')
    square4.click()

    // Player X gets position2
    const square2 = screen.getByTestId('square2')
    square2.click()
  }

  const drawGame = () => {
    // Player X gets position 0
    const square0 = screen.getByTestId('square0')
    square0.click()

    // Player O gets position 3
    const square3 = screen.getByTestId('square3')
    square3.click()

    // Player X gets position 1
    const square1 = screen.getByTestId('square1')
    square1.click()

    // Player O gets position 4
    const square4 = screen.getByTestId('square4')
    square4.click()

    // Player X gets position 5
    const square5 = screen.getByTestId('square5')
    square5.click()

    // Player O gets position 2
    const square2 = screen.getByTestId('square2')
    square2.click()

    // Player X gets position 6
    const square6 = screen.getByTestId('square6')
    square6.click()

    // Player O gets position 7
    const square7 = screen.getByTestId('square7')
    square7.click()

    // Player O gets position 8
    const square8 = screen.getByTestId('square8')
    square8.click()
  }

  it('should mark an X on the board when the player "X" clicks the square0', async () => {
    render(
      <TicTacToe
        numberOfColumns={DEFAULT_NUMBER_OF_COLUMNS}
        buttonState={buttonInitialState}
        setButtonState={jest.fn()}
      />,
    )
    const startButton = screen.getByText(GAME_MESSAGES.startButton)
    fireEvent.click(startButton)

    // square0 represents the first square on the board
    const square0 = screen.getByTestId('square0')
    square0.click()

    expect(square0.textContent).toEqual(PlayType.x)
  })

  it("should show a message that player X won when he marks three X's in a row", async () => {
    render(
      <TicTacToe
        numberOfColumns={DEFAULT_NUMBER_OF_COLUMNS}
        buttonState={buttonInitialState}
        setButtonState={jest.fn()}
      />,
    )
    const startButton = screen.getByText(GAME_MESSAGES.startButton)
    fireEvent.click(startButton)

    playerXWinsGame()

    // A message that shows that player X won should be shown in the screen
    screen.getByText(template(GAME_MESSAGES.win)({ player: PlayType.x }))
  })

  it('should show a message that there was a draw when player X and player O fully fill up the board', async () => {
    render(
      <TicTacToe
        numberOfColumns={DEFAULT_NUMBER_OF_COLUMNS}
        buttonState={buttonInitialState}
        setButtonState={jest.fn()}
      />,
    )
    const startButton = screen.getByText(GAME_MESSAGES.startButton)
    fireEvent.click(startButton)

    drawGame()

    // There should be a message that shows that there was a draw
    screen.getByText(GAME_MESSAGES.draw)
  })
})
