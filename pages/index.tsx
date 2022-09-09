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
              Let a pro&shy;fes&shy;sion&shy;al de&shy;vel&shy;op&shy;er take
              care of your web&shy;site, so you can focus on what you love.
            </p>
            <Link href="/contact">
              <a className={styles["call-to-action"]}>Get in touch</a>
            </Link>
            <hr />
            <h2>What do you want your web&shy;site to be?</h2>
            <section>
              <h3>Look breathtaking?</h3>
              <img
                decoding="async"
                className="float left"
                src="/img/research.webp"
                alt=""
              />
              <p>
                After an initial ex&shy;change, I create a concept that we
                review together and possibly revise.
              </p>
              <p>
                I have pro&shy;fes&shy;sion&shy;al experience with different
                tech&shy;nolo&shy;gies and can easily choose the right one for
                your web&shy;site.
              </p>
            </section>
            <section>
              <h3>Support Internet Explorer?</h3>
              <img
                decoding="async"
                className="float right"
                src="/img/grandma.webp"
                alt=""
              />
              <p>
                <strong>No way!</strong>
              </p>
              <p>
                Internet Explorer is dead, and for good reason. A modern
                in&shy;ter&shy;face is simply not pos&shy;si&shy;ble with this
                browser. It is also very in&shy;secure. Read more about it{" "}
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
            <h2>Did I con&shy;vince you?</h2>
            <Link href="/contact">
              <a className={styles["call-to-action"]}>Get in touch</a>
            </Link>
          </>,
        ],
        [
          "de",
          <>
            <h1 className={styles.heading}>
              Hole dir deine pro&shy;fes&shy;sio&shy;nelle Webseite
            </h1>
            <p>
              Gib deine Web&shy;seite an einen pro&shy;fes&shy;sio&shy;nellen
              Entwickler ab, damit du dich auf das kon&shy;zen&shy;trie&shy;ren
              kannst, was du liebst.
            </p>
            <Link href="/contact">
              <a className={styles["call-to-action"]}>
                Jetzt Kontakt auf&shy;nehmen
              </a>
            </Link>
            <hr />
            <h2>Was soll deine Webseite können?</h2>
            <section>
              <h3>Atem&shy;beraubend aussehen?</h3>
              <img
                decoding="async"
                className="float left"
                src="/img/research.webp"
                alt=""
              />
              <p>
                Nach einem ersten Austausch entwerfe ich ein Konzept, welches
                wir zusammen durch&shy;gehen und eventuell über&shy;arbeiten.
              </p>
              <p>
                Ich habe pro&shy;fes&shy;sio&shy;nelle Erfahrung mit
                unter&shy;schied&shy;lichen Tech&shy;no&shy;lo&shy;gien und kann
                mit leich&shy;tig&shy;keit das passende für deine Web&shy;seite
                auswählen.
              </p>
            </section>
            <section>
              <h3>Internet Explorer unterstützen?</h3>
              <img
                decoding="async"
                className="float right"
                src="/img/grandma.webp"
                alt=""
              />
              <p>
                <strong>Nein!</strong>
              </p>
              <p>
                Der Internet Explorer ist tot und das aus gutem Grund. Eine
                Moderne Ober&shy;fläche ist mit diesem Browser einfach nicht
                möglich. Zudem ist er sehr unsicher. Mehr dazu{" "}
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
