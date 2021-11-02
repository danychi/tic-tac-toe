import React, { FC } from 'react'
import styled from 'styled-components'
import { COLORS } from '../constants'
import { PlayType } from '../enums'

type Props = {
  value: PlayType
  onClick: () => void
  testId: string
}

const StyledButton = styled.button`
  outline: 'none';
  height: 150px;
  background: ${COLORS.primary};
  border: 1px solid black;
  color: ${COLORS.secondary};
  font-size: 30px;
  font-weight: bold;
`

const Square: FC<Props> = ({ value, onClick, testId }) => (
  <StyledButton onClick={onClick} data-testid={testId}>
    {value}
  </StyledButton>
)

export { Square }
