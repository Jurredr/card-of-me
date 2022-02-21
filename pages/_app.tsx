import { createTheme, NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import 'windi.css'
import '../styles/globals.scss'
import '@fontsource/montserrat'
import WebHead from '../components/WebHead'

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

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider theme={theme}>
        <WebHead />
        <div className="relative h-screen w-screen bg-black">
          <Component {...pageProps} />
        </div>
      </NextUIProvider>
    </SessionProvider>
  )
}

export default MyApp
