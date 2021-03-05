import '../styles/global.css'
import initAuth from '../utils/initAuth' // the module you created above

initAuth()

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}