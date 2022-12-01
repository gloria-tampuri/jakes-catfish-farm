import Layout from '../components/UI/Layout'
import { ThemeContextProvider } from '../context/theme'
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  return <ThemeContextProvider>
    <Layout><Component {...pageProps} /></Layout>
  </ThemeContextProvider>
}

export default MyApp
