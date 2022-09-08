import "../styles/index.scss";
import "../styles/desktop.scss";
import type { AppProps } from "next/app";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

const MyApp = (props: AppProps) => (
  <>
    <Nav />
    <main>
      <props.Component {...props.pageProps} />
    </main>
    <Footer />
  </>
);

export default MyApp;
