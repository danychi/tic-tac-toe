import { PlayType } from './enums'

type Triplet = [number, number, number]

const horizontal: Triplet[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
]

const vertical: Triplet[] = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
]

const diagonal: Triplet[] = [
  [0, 4, 8],
  [2, 4, 6],
]

const calculateDidSomeoneWin = (board: PlayType[]): boolean => {
  const verification = ([a, b, c]: Triplet): boolean =>
    board[a] !== '' && board[a] === board[b] && board[a] === board[c]
  // The calculation will stop in the moment that the horizontal/vertical/diagonal winning verification is true
  return (
    horizontal.some(verification) ||
    vertical.some(verification) ||
    diagonal.some(verification)
  )
}

export { calculateDidSomeoneWin }
