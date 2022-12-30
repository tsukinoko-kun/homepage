/* eslint-disable @typescript-eslint/no-explicit-any */
import "../styles/index.scss"
import { motion, AnimatePresence } from "framer-motion"
import type { AppProps } from "next/app"
import Head from "next/head"
import { XmlTag } from "../components/XmlTag"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { lazy, useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useRouter } from "next/router"
import OGImage from "../images/og-image.jpg"

const ErrorFallback = lazy(() => import("../components/ErrorFallback"))

const variants = {
    hidden: { opacity: 0, x: -100, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 100, y: 0 },
}

const getScrollY = () =>
    ((document.documentElement.scrollTop || document.body.scrollTop) /
        ((document.documentElement.scrollHeight || document.body.scrollHeight) -
            document.documentElement.clientHeight))

const getSizeY = () => document.documentElement.scrollHeight || document.body.scrollHeight

const onWindowScroll = () => {
    window.document.documentElement.style.setProperty(
        "--scroll-y",
        getScrollY().toString()
    )

    window.document.documentElement.style.setProperty(
        "--size-y",
        getSizeY() + "px"
    )
}

const scrollAELOptions = { passive: true }

const App = ({ Component, pageProps }: AppProps) => {
    const { title, description } = pageProps
    const router = useRouter()
    const canonical = new URL(router.pathname, "https://www.frank-mayer.io")

    useEffect(() => {
        if (!window || (window as any)["__app_effect__"]) {
            return
        }

        (window as any)["__app_effect__"] = true

        window.addEventListener("scroll", onWindowScroll, scrollAELOptions)
        onWindowScroll()

        return () => {
            (window as any)["__app_effect__"] = false
            window.removeEventListener("scroll", onWindowScroll)
        }
    })

    return (
        <>
            <Head>
                <title>{`Frank Mayer \\\\ ${title}`}</title>
                <meta property="og:title" content={`Frank Mayer \\\\ ${title}`} />
                <meta name="description" content={description} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonical.href} />
                <meta property="canonical" content={canonical.href} />
                <meta property="og:image" content={OGImage.src} />
            </Head>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <XmlTag tag="html" attributes={{ lang: "en-US" }}>
                    <XmlTag tag="body">
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <Header />
                        </ErrorBoundary>
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
                                <ErrorBoundary FallbackComponent={ErrorFallback}>
                                    <Component {...pageProps} />
                                </ErrorBoundary>
                            </motion.main>
                        </AnimatePresence>
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <Footer />
                        </ErrorBoundary>
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
                </XmlTag>
            </ErrorBoundary>
        </>
    )
}

export default App
