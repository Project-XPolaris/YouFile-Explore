import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'
import { ThemeProvider } from '@material-ui/core'
import theme from './theme'
import RouterLayout from './layout/Router'
import { useTitle } from 'ahooks'
import { SnackbarProvider } from 'notistack'
import { ipcRenderer } from 'electron'
import { ChannelNames } from '../electron/channels'
import { DefaultWindowShare } from './window'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  useTitle('YouFile')
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <RouterLayout />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  )
}
DefaultWindowShare.parseId()
ipcRenderer.on(ChannelNames.initWindow, (event, { id }) => {
  DefaultWindowShare.id = id
  console.log('init id = ' + id)
})
render(<App />, mainElement)
