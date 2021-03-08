import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
  }
`
