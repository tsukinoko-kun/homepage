import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{`Frank Mayer \\\\ ${Component.displayName}`}</title>
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
        <Footer />
      </main>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "navigator.serviceWorker.getRegistrations().then(function(registrations) {for(const registration of registrations) {registration.unregister()}})",
        }}
      ></script>
    </>
  );
}
