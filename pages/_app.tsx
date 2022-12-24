import "../styles/index.scss"
import { motion, AnimatePresence } from "framer-motion"
import type { AppProps } from "next/app"
import Head from "next/head"
import { XmlTag } from "../components/XmlTag"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import CaveatFont from "../fonts/Caveat.woff2"
import JetBrainsMonoFont from "../fonts/JetBrainsMono.woff2"
import { LoadFonts, PreLoadFonts } from "../components/LoadFonts"

const variants = {
    hidden: { opacity: 0, x: -100, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 100, y: 0 },
}

export default function App({ Component, pageProps }: AppProps) {
    const { title, description } = pageProps

    return (
        <>
            <Head>
                <title>{`Frank Mayer \\\\ ${title}`}</title>
                <meta name="description" content={description} />
                <PreLoadFonts fonts={[{ name:"Caveat", url:CaveatFont }, { name:"JetBrainsMono", url: JetBrainsMonoFont }]} />
            </Head>
            <LoadFonts fonts={[{ name:"Caveat", url:CaveatFont }, { name:"JetBrainsMono", url: JetBrainsMonoFont }]} />
            <XmlTag tag="html" attributes={{ lang: "en-US" }} />
            <XmlTag tag="head">
                <XmlTag tag="title">{`Frank Mayer \\\\ ${title}`}</XmlTag>
                <XmlTag tag="meta" attributes={{ name: "description", content: description }} />
                <XmlTag tag="meta" attributes={{ name: "viewport", content: "width=device-width, initial-scale=1" }} />
                <XmlTag tag="link" attributes={{ rel: "icon", href: "/favicon.ico" }} />
            </XmlTag>
            <XmlTag tag="body">
                <Header />
                <AnimatePresence
                    mode="wait"
                    initial={false}
                    presenceAffectsLayout
                >
                    <motion.main
                        key={title}
                        variants={variants}
                        initial="hidden"
                        animate="enter"
                        exit="exit"
                        transition={{ type: "linear", duration: 0.5 }}
                    >
                        <Component {...pageProps} />
                    </motion.main>
                </AnimatePresence>
                <Footer/>
                <XmlTag tag="script" language="jsx">
                    {`import React from "react"
import { createRoot } from "react-dom/client"
import ${title}Page from "./pages/${title}"

const appEl = document.getElementById("app")

if (appEl) {
    globalThis.reactRoot = createRoot(appEl)

    globalThis.reactRoot.render(
        <React.StrictMode>
            <${title}Page />
        </React.StrictMode>
    )
}`}
                </XmlTag>
            </XmlTag>
        </>
    )
}
