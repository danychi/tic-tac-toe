import React, { FC } from 'react'
import styled from 'styled-components'
import { GAME_MESSAGES } from '../messages'

const Rule = styled.li``
// TODO Array(4).fill('').map((_, index) => GAME_MESSAGES[rule${index + 1}]) should work, but typescript doesn't like this uncertainty 😅
const rules = [
  GAME_MESSAGES.rule1,
  GAME_MESSAGES.rule2,
  GAME_MESSAGES.rule3,
  GAME_MESSAGES.rule4,
]

const Wrap = styled.div`
  max-width: 780px;
  margin: 0 auto 20px;
`

const Title = styled.h2`
  font-size: 24px;
`
const Subtitle = styled.h3`
  font-size: 20px;
`

const Intro: FC = () => (
  <Wrap>
    <Title>{GAME_MESSAGES.intro}</Title>
    <Subtitle>{GAME_MESSAGES.rulesTitle}</Subtitle>
    <ul>
      {rules.map((rule, index) => (
        <Rule key={index}>{rule}</Rule>
      ))}
    </ul>
  </Wrap>
)

export { Intro }
