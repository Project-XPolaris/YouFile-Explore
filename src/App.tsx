import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'
import FrameLayout from './layout/Frame'
import { ThemeProvider } from '@material-ui/core'
import theme from './theme'
import RouterLayout from './layout/Router'
import { useTitle } from 'ahooks'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  useTitle('YouFile')
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <FrameLayout>
          <RouterLayout />
        </FrameLayout>
      </ThemeProvider>
    </>
  )
}

render(<App />, mainElement)
