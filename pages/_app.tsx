import "../styles/index.scss";
import "../styles/desktop.scss";
import "../styles/mobile.scss";
import type { AppProps } from "next/app";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const MyApp = (props: AppProps) => {
  const router = useRouter();
  return (
    <AnimatePresence mode="wait">
      <Nav />
      <motion.main
        key={router.route}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{ duration: 0.2 }}
        variants={{
          initialState: {
            opacity: 0,
            y: 100,
          },
          animateState: {
            opacity: 1,
            y: 0,
          },
          exitState: {
            opacity: 0,
            y: -100,
          },
        }}
      >
        <props.Component {...props.pageProps} />
      </motion.main>
      <Footer />
    </AnimatePresence>
  );
};

export default MyApp;
