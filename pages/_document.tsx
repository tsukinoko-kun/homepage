import { Html, Head, Main, NextScript } from "next/document"
import CaveatFont from "../fonts/Caveat.woff2"
import JetBrainsMonoFont from "../fonts/JetBrainsMono.woff2"
import CircularSpBookFont from "../fonts/CircularSp-Book.woff2"
import { PreLoadFonts } from "../components/LoadFonts"

const Document = () => (
    <Html lang="en-US">
        <Head>
            <PreLoadFonts fonts={[{ name:"Caveat", url:CaveatFont }, { name:"JetBrainsMono", url: JetBrainsMonoFont }, { name:"CircularSp", url: CircularSpBookFont }]} />
            <script
                async
                data-ad-client="ca-pub-1590375905385922"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1590375905385922"
                crossOrigin="anonymous"
            />
            <meta property="og:site_name" content="Frank Mayer" />
            <meta property="og:type" content="website" />
            <meta name="twitter:site" content="@FF1493FF" />
            <meta name="twitter:creator" content="@FF1493FF" />
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
