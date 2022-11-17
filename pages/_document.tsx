import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en-US">
      <Head>
        <link rel="preconnect" href="https://www.amagumo.cloud" />
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
  );
};

export default Document;
