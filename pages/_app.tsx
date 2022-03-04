import { createTheme, NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import 'windi.css'
import '../styles/globals.scss'
import '@fontsource/montserrat'
import WebHead from '../components/WebHead'
import { SSRProvider } from '@react-aria/ssr'

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
    <SSRProvider>
      <NextUIProvider theme={theme}>
        <SessionProvider session={session}>
          <WebHead />
          <div className="relative h-screen w-screen bg-black">
            <Component {...pageProps} />
          </div>
        </SessionProvider>
      </NextUIProvider>
    </SSRProvider>
  )
}

export default MyApp
