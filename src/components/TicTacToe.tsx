import React, { FC, useCallback, useEffect, useState } from 'react'
import template from 'lodash.template'
import styled from 'styled-components'
import { PlayType } from '../enums'
import { GAME_MESSAGES } from '../messages'
import { calculateDidSomeoneWin } from '../utils'
import { Board } from './Board'
import { Message } from './Message'
import { Intro } from './Intro'
import { Button } from './Button'
import { ButtonStateType } from '../redux/reducers/button'

const Wrap = styled.div`
  max-width: 1280px;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`
const ButtonWrap = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  justify-content: center;
`

type Props = {
  numberOfColumns: number
}

type ReduxProps = {
  buttonState: ButtonStateType
  setButtonState: (buttonState: ButtonStateType) => void
}

type TicTacToeProps = Props & ReduxProps

const TicTacToe: FC<TicTacToeProps> = ({
  numberOfColumns,
  buttonState,
  setButtonState,
}) => {
  const [isIntroScreenActive, setIsIntroScreenActive] = useState<boolean>(true)
  const [board, setBoard] = useState<PlayType[]>(
    Array(numberOfColumns ** 2).fill(PlayType.empty),
  )
  const [player, setPlayer] = useState<PlayType>(PlayType.x)
  const [message, setMessage] = useState<string>(
    template(GAME_MESSAGES.nextTurn)({ player }),
  )

  const resetGame = useCallback(() => {
    setBoard(Array(numberOfColumns ** 2).fill(PlayType.empty))
    setPlayer(PlayType.x)
    setIsIntroScreenActive(false)
    setMessage(template(GAME_MESSAGES.nextTurn)({ player }))
    setButtonState({ ...buttonState, isVisible: false })
  }, [
    setBoard,
    setPlayer,
    setIsIntroScreenActive,
    setMessage,
    buttonState,
    numberOfColumns,
    player,
    setButtonState,
  ])

  const showRestartGameButton = useCallback(() => {
    setButtonState({
      ...buttonState,
      isVisible: true,
      text: GAME_MESSAGES.restartButton,
    })
  }, [setButtonState, buttonState])

  useEffect(() => {
    // Run this effect only once to initialize to make sure we initialize the start button
    setButtonState({ ...buttonState, isVisible: true, onClick: resetGame })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSquareClick = (position: number): void => {
    if (player === PlayType.empty || board[position] !== PlayType.empty) {
      // The player can't do anything when player is 'empty' because that means that someone won or it was a draw
      // Also when the player click in a square that is already occupied, we shouldn't do anything
      return
    }

    const boardCopy = [...board]
    boardCopy[position] = player
    setBoard(boardCopy) // update board before recomputing the winner

    if (calculateDidSomeoneWin(boardCopy)) {
      setMessage(template(GAME_MESSAGES.win)({ player }))
      setPlayer(PlayType.empty)
      showRestartGameButton()
      return
    }

    // if the board is full and there's no winner, then it's a draw
    if (boardCopy.indexOf(PlayType.empty) === -1) {
      setMessage(GAME_MESSAGES.draw)
      setPlayer(PlayType.empty)
      showRestartGameButton()
    } else {
      const nextPlayer = player === PlayType.x ? PlayType.o : PlayType.x
      setPlayer(nextPlayer)
      setMessage(template(GAME_MESSAGES.nextTurn)({ player: nextPlayer }))
    }
  }

  return (
    <Wrap>
      {isIntroScreenActive ? (
        <Intro />
      ) : (
        <>
          <Board
            board={board}
            onClick={handleSquareClick}
            numberOfColumns={numberOfColumns}
          />
          <Message>{message}</Message>
        </>
      )}
      {buttonState.isVisible && (
        <ButtonWrap>
          <Button onClick={buttonState.onClick}>{buttonState.text}</Button>
        </ButtonWrap>
      )}
    </Wrap>
  )
}

export { TicTacToe }
