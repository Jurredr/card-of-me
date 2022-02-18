import { createTheme, NextUIProvider } from '@nextui-org/react'
import type { AppProps } from 'next/app'
import '@fontsource/montserrat'
import 'windi.css'
import '../styles/globals.scss'

const theme = createTheme({
  type: 'light',
  theme: {
    colors: {},
    space: {},
    fonts: {
      montserrat: 'Montserrat'
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
