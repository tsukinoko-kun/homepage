import type { NextPage } from "next";
import { Lang } from "../../components/LanguageSwitcher";

export const getStaticPaths = () => {
  return {
    paths: [{ params: { browser: "Internet Explorer" } }],
    fallback: true,
  };
};

export const getStaticProps = (context: any) => {
  return {
    props: {
      ...context.params,
    },
  };
};

const Page: NextPage = (props: any) => (
  <Lang>
    {[
      [
        "en",
        <>
          <h1>Your Browser is outdated</h1>
          <p>It seems that you are using {props.browser}.</p>
          <p>This page supports only current browsers to use new features.</p>
          <br />
          <h2>What can I do?</h2>
          <p>
            You can use a modern browser like Firefox, Chrome or Edge. These are
            free and can be downloaded from the respective manufacturer&apos;s
            website. They usually update themselves automatically.
          </p>
        </>,
      ],
      [
        "de",
        <>
          <h1>Dein Browser ist veraltet</h1>
          <p>Es scheint, als würdest du {props.browser} verwenden.</p>
          <p>
            Diese Seite unterstützt nur aktuelle Browser, um neue Features
            verwenden zu können.
          </p>
          <br />
          <h2>Was kann ich tun?</h2>
          <p>
            Du kannst einen modernen Browser wie Firefox, Chrome oder Edge
            verwenden. Diese sind kostenlos und können auf der jeweiligen
            Herstellerseite heruntergeladen werden. Diese aktualisieren sich in
            der Regel selbstständig.
          </p>
        </>,
      ],
    ]}
  </Lang>
);

export default Page;
