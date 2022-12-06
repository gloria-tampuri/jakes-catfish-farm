import Head from 'next/head'
import Layout from '../components/UI/Layout'
import { ThemeContextProvider } from '../context/theme'
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  return <>
  <Head>
  <title>Homewell Ventures</title>
  <link rel="manifest" href="/manifest.json" />  
  <meta name="theme-color"/>
  <link rel="apple-touch-icon" href="images/icons/96.png"/>
  <meta name="apple-mobile-web-app-status-bar" content="#087EA4"/>
  </Head>
    <ThemeContextProvider>
    <Layout><Component {...pageProps} /></Layout>
  </ThemeContextProvider>
  </>
}

export default MyApp
