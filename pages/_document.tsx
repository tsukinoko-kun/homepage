import { Html, Head, Main, NextScript } from "next/document"
import CaveatFont from "../fonts/Caveat.woff2"
import JetBrainsMonoFont from "../fonts/JetBrainsMono.woff2"
import CircularSpBookFont from "../fonts/CircularSp-Book.woff2"
import { PreLoadFonts } from "../components/LoadFonts"

const Document = () => (
    <Html lang="en-US">
        <Head>
            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1590375905385922"
                crossOrigin="anonymous"
            ></script>
            <PreLoadFonts fonts={[{ name:"Caveat", url:CaveatFont }, { name:"JetBrainsMono", url: JetBrainsMonoFont }, { name:"CircularSp", url: CircularSpBookFont }]} />
        </Head>
        <body>
            <Main />
            <NextScript />
            <script
                dangerouslySetInnerHTML={{
                    __html: "navigator.serviceWorker.getRegistrations().then(function(registrations) {for(const registration of registrations) {registration.unregister()}})",
                }}
            ></script>
        </body>
    </Html>
)

export default Document
