import { PlayType } from './enums'

const calculateDidSomeoneWin = (board: PlayType[]): boolean => {
  const winningColumns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  // checking each of the positions seeing if any of the two players won
  for (let i = 0; i < winningColumns.length; i++) {
    const [a, b, c] = winningColumns[i]
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      return true
    }
  }
  return false
}

export { calculateDidSomeoneWin }
