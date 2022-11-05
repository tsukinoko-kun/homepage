import "../styles/globals.scss";
import { motion, AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

const variants = {
  hidden: { opacity: 0, x: -100, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 100, y: 0 },
};

export default function App({ Component, pageProps }: AppProps) {
  const { title, description } = pageProps;

  return (
    <>
      <Head>
        <title>{`Frank Mayer \\\\ ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
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
          <Footer />
        </motion.main>
      </AnimatePresence>
    </>
  );
}
