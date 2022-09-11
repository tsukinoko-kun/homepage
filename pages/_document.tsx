import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/JetBrainsSans.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <meta name="theme-color" content="#000000" />
          <meta name="color-scheme" content="dark" />
          <meta name="hostname" content="frank-mayer.io" />
          <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="author" content="Frank Mayer" />
          <meta name="msapplication-TileColor" content="#000000" />

          {/* open graph */}
          <meta property="og:type" content="website" />
          <meta property="og:locale:alternate" content="de" />
          <meta property="og:locale:alternate" content="en" />
          <meta property="og:image:alt" content="Frank Mayer" />
          <meta
            name="image"
            property="og:image"
            content="/hotlink-ok/preview.png"
          />

          {/* twitter */}
          <meta name="twitter:image:src" content="/hotlink-ok/preview.png" />
          <meta name="twitter:site" content="@FF1493FF" />
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:image" content="/hotlink-ok/preview.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script defer async src="/checkBrowser.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
