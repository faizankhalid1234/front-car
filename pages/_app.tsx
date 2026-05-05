import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e3c72" />
        <meta name="application-name" content="Premium Car Collection" />
        <meta name="description" content="Discover and manage premium cars with details like price, mileage, and transmission in one responsive app." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Premium Car Collection" />
        <meta property="og:title" content="Premium Car Collection" />
        <meta property="og:description" content="Explore premium cars and manage your vehicle inventory with ease." />
        <meta property="og:url" content={siteUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premium Car Collection" />
        <meta name="twitter:description" content="Explore premium cars and manage your vehicle inventory with ease." />
        <link rel="canonical" href={siteUrl} />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
