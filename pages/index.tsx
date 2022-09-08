import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Lang } from "../components/LanguageSwitcher";
import { title } from "../lib/title";

import styles from "../styles/hero-section.module.scss";

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
            <h1 className={styles.heading}>
              Get your website,
              <br />
              the professional way
            </h1>
            <p>
              Let a professional developer take care of your website, so you can
              focus on what you love.
            </p>
            <Link href="/contact">
              <a className={styles["call-to-action"]}>Get in touch</a>
            </Link>
            <hr />
            <h2>What do you want your website to be?</h2>
            <section>
              <img
                decoding="async"
                className="float right"
                src="/img/research.webp"
                alt=""
              />
              <h3>Look breathtaking?</h3>
              <p>
                After an initial exchange, I create a concept that we review
                together and possibly revise.
              </p>
              <p>
                I have professional experience with different technologies and
                can easily choose the right one for your website.
              </p>
            </section>
            <section>
              <img
                decoding="async"
                className="float left"
                src="/img/grandma.webp"
                alt=""
              />
              <h3>Support Internet Explorer?</h3>
              <p>
                <strong>No way!</strong>
              </p>
              <p>
                Internet Explorer is dead, and for good reason. A modern
                interface is simply not possible with this browser. It is also
                very insecure. Read more about it{" "}
                <a
                  target="_blank"
                  href="https://www.ezcomputersolutions.com/blog/stop-using-internet-explorer"
                >
                  here
                </a>
                .
              </p>
            </section>
            <hr />
            <h2>Did I convince you?</h2>
            <Link href="/contact">
              <a className={styles["call-to-action"]}>Get in touch</a>
            </Link>
          </>,
        ],
        [
          "de",
          <>
            <h1 className={styles.heading}>
              Hole dir deine professionelle Webseite
            </h1>
            <p>
              Gib deine Webseite an einen professionellen Entwickler ab, damit
              du dich auf das konzentrieren kannst, was du liebst.
            </p>
            <Link href="/contact">
              <a className={styles["call-to-action"]}>
                Jetzt Kontakt aufnehmen
              </a>
            </Link>
            <hr />
            <h2>Was soll deine Webseite können?</h2>
            <section>
              <img
                decoding="async"
                className="float right"
                src="/img/research.webp"
                alt=""
              />
              <h3>Atemberaubend aussehen?</h3>
              <p>
                Nach einem ersten Austausch entwerfe ich ein Konzept, welches
                wir zusammen durchgehen und eventuell überarbeiten.
              </p>
              <p>
                Ich habe professionelle Erfahrung mit unterschiedlichen
                Technologien und kann mit leichtigkeit das passende für deine
                Webseite auswählen.
              </p>
            </section>
            <section>
              <img
                decoding="async"
                className="float left"
                src="/img/grandma.webp"
                alt=""
              />
              <h3>Internet Explorer unterstützen?</h3>
              <p>
                <strong>Nein!</strong>
              </p>
              <p>
                Der Internet Explorer ist tot und das aus gutem Grund. Eine
                Moderne Oberfläche ist mit diesem Browser einfach nicht möglich.
                Zudem ist er sehr unsicher. Mehr dazu{" "}
                <a
                  target="_blank"
                  href="https://www.computerbild.de/artikel/cb-Tipps-Software-Kommentar-Warum-ist-der-Internet-Explorer-so-schlecht-Rauswurf-der-IE-aus-Windows-11-30623631.html"
                >
                  hier
                </a>
                .
              </p>
            </section>
            <hr />
            <h2>Konnte ich dich begeistern?</h2>
            <Link href="/contact">
              <a className={styles["call-to-action"]}>
                Jetzt Kontakt aufnehmen
              </a>
            </Link>
          </>,
        ],
      ]}
    </Lang>
  </>
);

export default Page;
