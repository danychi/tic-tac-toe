import { createGlobalStyle } from 'styled-components'
import { COLORS } from './constants'

export default createGlobalStyle`
body {
    background-color: ${COLORS.black};
    color: ${COLORS.secondary};
    font-size: 16px;
    font-family: Helvetica,Arial,sans-serif;
}
`
