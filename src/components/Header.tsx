import React from 'react'
import styled from 'styled-components'

const LogoWrap = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
`

const Logo = styled.img`
  max-width: 100px;
  min-height: 40px;
`

const Header = () => (
  <LogoWrap>
    <Logo
      src="//cdn.shopify.com/s/files/1/0348/3861/0055/files/on_air_events_logo_100x@2x.png?v=1631104047"
      alt="On Air Events logo"
    />
  </LogoWrap>
)

export { Header }
