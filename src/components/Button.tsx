import styled from 'styled-components'
import { COLORS } from '../constants'

const Button = styled.button`
  background-color: ${COLORS.primary};
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: ${COLORS.secondary};
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 16px;

  &:hover,
  &:focus {
    background-color: ${COLORS.primaryLighten};
  }
`

export { Button }
