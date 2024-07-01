import type { AppProps } from 'next/app'
import Login from './login'
import '.././app/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const loggedInUser = false

  if (!loggedInUser) return <Login />
  return <Component {...pageProps} />
}

export default MyApp
