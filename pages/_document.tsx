import { Html, Head, Main, NextScript } from "next/document"

const Document = () => (
    <Html lang="en-US">
        <Head>
            <meta property="og:site_name" content="Frank Mayer" />
            <meta property="og:type" content="website" />
            <meta name="twitter:site" content="@FF1493FF" />
            <meta name="twitter:creator" content="@FF1493FF" />
            <meta name="theme-color" content="#140c17" />
            <link rel="manifest" href="/manifest.json" type="application/json" />
        </Head>
        <body>
            <Main />
            <NextScript />
            <script
                dangerouslySetInnerHTML={{
                    __html: "navigator.serviceWorker.getRegistrations().then(function(registrations) {for(const registration of registrations) {registration.unregister()}})",
                }}
            />
        </body>
    </Html>
)

export default Document
