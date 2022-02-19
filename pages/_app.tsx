import { createTheme, NextUIProvider } from '@nextui-org/react'
import type { AppProps } from 'next/app'
import 'windi.css'
import '../styles/globals.scss'
import '@fontsource/montserrat'

// NextUI theme
const theme = createTheme({
  type: 'dark',
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
      <div className="relative h-screen w-screen bg-black">
        <Component {...pageProps} />
      </div>
    </NextUIProvider>
  )
}

export default MyApp
