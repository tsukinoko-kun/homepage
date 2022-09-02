import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Lang } from "../components/LanguageSwitcher";
import { title } from "../lib/title";

const Page: NextPage = () => (
  <>
    <Head>
      <title>{title()}</title>
    </Head>
    <Lang>
      {[
        [
          "en",
          <>
            <h1>Frank Mayer</h1>
            <p>
              Professional developer for <b>high-performance</b> web
              applications.
            </p>
            <p>
              <b>My name is Frank Mayer</b>, I am a{" "}
              <b>certified IT specialist</b> for application development. I am
              mainly working as a frontend developer. Here I prefer to work with
              HTML5, Scss and TypeScript. I also have experience at backend with
              C#, Kotlin and F#.
            </p>
            <p>
              Besides, I freelance for private clients or work on my projects.
            </p>
            <p>
              Most of my projects are <b>open source</b> available on{" "}
              <a href="https://github.com/Frank-Mayer">GitHub</a>. You can find
              a selection in my{" "}
              <Link href="/portfolio">
                <a>portfolio</a>
              </Link>
              .
            </p>
            <p>
              Want to start a project with me? Then just get in touch{" "}
              <Link href="/contact">
                <a>here</a>
              </Link>
              .
            </p>
          </>,
        ],
        [
          "de",
          <>
            <h1>Frank Mayer</h1>
            <p>
              Professioneller Entwickler für <b>performante</b> Web-Anwendungen.
            </p>
            <p>
              <b>Mein Name ist Frank Mayer</b>, ich bin{" "}
              <b>ausgebildeter Fachinformatiker</b> für Anwendungsentwicklung.
              Hauptsächlich bin ich in der Frontendentwicklung tätig, hier
              arbeite ich am liebsten mit HTML5, Scss und TypeScript. Auch im
              Backend habe ich Erfahrung mit C#, Kotlin und F#.
            </p>
            <p>
              Nebenher bin ich als Freelancer für Privatpersonen tätig oder
              arbeite an eigenen Projekten.
            </p>
            <p>
              Die meisten meiner Projekte sind <b>quelloffen</b> auf{" "}
              <a href="https://github.com/Frank-Mayer">GitHub</a> verfügbar.
              Eine Auswahl findest Du in meinem{" "}
              <Link href="/portfolio">
                <a>portfolio</a>
              </Link>
              .
            </p>
            <p>
              Du willst ein Projekt mit mir starten? Du kannst mich{" "}
              <Link href="/contact">
                <a>hier</a>
              </Link>{" "}
              kontaktieren.
            </p>
          </>,
        ],
      ]}
    </Lang>
  </>
);

export default Page;
