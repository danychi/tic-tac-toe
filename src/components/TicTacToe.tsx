import React, { FC, useState } from 'react'
import template from 'lodash.template'
import styled from 'styled-components'
import { PlayType } from '../enums'
import { GAME_MESSAGES } from '../messages'
import { calculateDidSomeoneWin } from '../utils'
import { Board } from './Board'
import { Message } from './Message'
import { Intro } from './Intro'
import { Button } from './Button'

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
type ButtonProps = {
  isVisible: boolean
  text: string
  onClick: () => unknown
}

type TicTacToeProps = {
  numberOfColumns: number
}

const TicTacToe: FC<TicTacToeProps> = ({ numberOfColumns }) => {
  const [isIntroScreenActive, setIsIntroScreenActive] = useState<boolean>(true)
  const [board, setBoard] = useState<PlayType[]>(
    Array(numberOfColumns ** 2).fill(PlayType.empty),
  )
  const [player, setPlayer] = useState<PlayType>(PlayType.x)
  const [message, setMessage] = useState<string>(
    template(GAME_MESSAGES.nextTurn)({ player }),
  )

  const resetGame = () => {
    setBoard(Array(numberOfColumns ** 2).fill(PlayType.empty))
    setPlayer(PlayType.x)
    setIsIntroScreenActive(false)
    setMessage(template(GAME_MESSAGES.nextTurn)({ player }))
    setButtonProps({ ...buttonProps, isVisible: false })
  }

  const [buttonProps, setButtonProps] = useState<ButtonProps>({
    isVisible: true,
    text: GAME_MESSAGES.startButton,
    onClick: resetGame,
  })

  const handleInput = (position: number): void => {
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
      setButtonProps({
        ...buttonProps,
        isVisible: true,
        text: GAME_MESSAGES.restartButton,
      })
      return
    }

    // if the board is full and there's no winner, then it's a draw
    if (boardCopy.indexOf(PlayType.empty) === -1) {
      setMessage(GAME_MESSAGES.draw)
      setPlayer(PlayType.empty)
      setButtonProps({
        ...buttonProps,
        isVisible: true,
        text: GAME_MESSAGES.restartButton,
      })
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
            onClick={handleInput}
            numberOfColumns={numberOfColumns}
          />
          <Message>{message}</Message>
        </>
      )}
      {buttonProps.isVisible && (
        <ButtonWrap>
          <Button onClick={buttonProps.onClick}>{buttonProps.text}</Button>
        </ButtonWrap>
      )}
    </Wrap>
  )
}

export { TicTacToe }
