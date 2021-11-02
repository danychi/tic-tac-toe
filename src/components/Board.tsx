import React, { FC } from 'react'
import styled from 'styled-components'
import { PlayType } from '../enums'
import { Square } from './Square'

type GridProps = {
  numberOfColumns: number
}

type BasicBoardProps = {
  board: PlayType[] // The board is composed of an array of plays, every position can be played by player 'X', 'O' or be still empty
  onClick: (position: number) => void
}

type BoardProps = GridProps & BasicBoardProps

const Wrap = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`

const Grid = styled.div<GridProps>`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ numberOfColumns }) =>
    `repeat(${numberOfColumns} , 1fr)`};
`

const Board: FC<BoardProps> = ({ board, onClick, numberOfColumns }) => (
  <Wrap>
    <Grid numberOfColumns={numberOfColumns}>
      {board.map((_, position) => (
        <Square
          key={position}
          value={board[position]}
          onClick={() => onClick(position)}
        />
      ))}
    </Grid>
  </Wrap>
)

export { Board }
