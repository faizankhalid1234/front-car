import Head from 'next/head'
import Link from 'next/link'

export default function OfflinePage() {
  return (
    <>
      <Head>
        <title>Offline | Premium Car Collection</title>
        <meta name="description" content="You are offline. Reconnect to browse your premium car inventory." />
      </Head>
      <main className="container">
        <section className="empty-state">
          <h1>You are offline</h1>
          <p>Please check your internet connection and try again.</p>
          <br />
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
        </section>
      </main>
    </>
  )
}
