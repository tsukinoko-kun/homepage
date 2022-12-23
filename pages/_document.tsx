import { Html, Head, Main, NextScript } from "next/document"

const Document = () => {
    return (
        <Html lang="en-US">
            <Head>
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1590375905385922"
                    crossOrigin="anonymous"
                ></script>
            </Head>
            <body>
                <Main />
                <NextScript />
                <script
                    dangerouslySetInnerHTML={{
                        __html:
              "navigator.serviceWorker.getRegistrations().then(function(registrations) {for(const registration of registrations) {registration.unregister()}})",
                    }}
                ></script>
            </body>
        </Html>
    )
}

export default Document
