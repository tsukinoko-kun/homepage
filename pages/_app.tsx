import "../styles/index.scss";
import "../styles/desktop.scss";
import "../styles/mobile.scss";
import type { AppProps } from "next/app";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

const MyApp = (props: AppProps) => {
  const canonical =
    "https://www.frank-mayer.io/" + props.router.locale + props.router.asPath;
  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
        <meta property="og:url" content={canonical} />
        <meta property="twitter:url" content={canonical} />
      </Head>
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          key={props.router.locale + props.router.asPath}
          initial="before"
          animate="idle"
          exit="after"
          transition={{ duration: 0.25 }}
          variants={{
            before: {
              opacity: 0,
              y: 75,
            },
            idle: {
              opacity: 1,
              y: 0,
            },
            after: {
              opacity: 0,
              y: -75,
            },
          }}
        >
          <props.Component {...props.pageProps} />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default MyApp;
