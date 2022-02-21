import Head from 'next/head'

const WebHead: React.FC = () => {
  return (
    <Head>
      {/* Base configuration */}
      <title>CardOf.Me | All Your Socials, One Card</title>
      <link rel="icon" href="/favicon.ico" />

      {/* SEO configuration */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta
        name="description"
        content="CardOfMe summarizes all your links, socials, game stats, and more into one shareable Card!"
      />
      <meta
        name="keywords"
        content="CardOf.Me, CardOfMe, Card, Links, Socials, LinkTree, LinkTr.ee, Summary, Business card"
      />
      <meta name="subject" content="Shareable User Cards" />
      <meta name="copyright" content="CardOfMe" />
      <meta name="language" content="EN" />
      <meta name="robots" content="index,follow" />
      <meta name="url" content="https://www.cardof.me" />
      <meta name="identifier-URL" content="https://www.cardof.me" />
      <meta name="theme-color" content="#D849F0" />
      <link rel="canonical" href="https://www.cardof.me" />

      {/* OpenGraph tags */}
      <meta
        property="og:title"
        content="CardOf.Me | All Your Socials, One Card"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="CardOfMe summarizes all your links, socials, game stats, and more into one Card!"
      />
      <meta property="og:image" content="/web-banner.png" />
      <meta property="og:image:url" content="/web-banner.png" />
      <meta property="og:image:secure_url" content="/web-banner.png" />
      <meta property="og:url" content="https://www.cardof.me" />
      <meta property="og:site_name" content="CardOf.Me" />
      <meta property="og:email" content="contact@jurre.me" />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="CardOf.me" />
      <meta
        name="twitter:description"
        content="CardOfMe summarizes all your links, socials, game stats, and more into one shareable Card!"
      />
      <meta name="twitter:image" content="/web-banner.png" />
      <meta name="twitter:site" content="@JurredeRuiter" />
      <meta name="twitter:creator" content="@JurredeRuiter" />
    </Head>
  )
}

export default WebHead
