import { NextUIProvider } from '@nextui-org/react'
import type { AppProps } from 'next/app'
import 'windi.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
