import type { NextPage } from "next";
import Head from "next/head";
import { Lang } from "../components/LanguageSwitcher";
import { title } from "../lib/title";

const Page: NextPage = () => (
  <>
    <Head>
      <title>{title("Portfolio")}</title>
    </Head>
    <h1>Portfolio</h1>

    <Lang>
      {[
        [
          "en",
          <>
            <p>
              Here are some of my projects. Older projects on this list are no
              longer maintained.
            </p>
          </>,
        ],
        [
          "de",
          <>
            <p>
              Hier sind einige meiner Projekte. Ältere Projekte dieser Liste
              werden nicht mehr weiterentwickelt.
            </p>
          </>,
        ],
      ]}
    </Lang>
  </>
);

export default Page;
