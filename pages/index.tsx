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
              Let a pro&#173;fes&#173;sion&#173;al de&#173;vel&#173;op&#173;er
              take care of your web&#173;site, so you can focus on what you
              love.
            </p>
            <Link href="/contact">
              <a className={styles["call-to-action"]}>Get in touch</a>
            </Link>
            <hr />
            <h2>What do you want your web&#173;site to be?</h2>
            <section>
              <h3>Look breathtaking?</h3>
              <img
                decoding="async"
                className="float left"
                src="/img/research.webp"
                alt=""
              />
              <p>
                After an initial ex&#173;change, I create a concept that we
                review together and possibly revise.
              </p>
              <p>
                I have pro&#173;fes&#173;sion&#173;al experience with different
                tech&#173;nolo&#173;gies and can easily choose the right one for
                your web&#173;site.
              </p>
            </section>
            <section>
              <h2>Designer vs Programmer</h2>
              <img className="float right" src="img/hacker.webp" alt="" />
              <p>I am a programmer.</p>
              <p>
                Although I know a lot about design thanks to some courses, I am
                far from being a designer. I can't design logos or create a
                complete brand identity.
              </p>
              <p>
                What I am good at is creating a website that works. I know how
                performance, security and search engine optimization work. I can
                implement everything from fancy 3D animations to simple 90s
                look.
              </p>
            </section>
            <section>
              <h2>My Tools</h2>
              <img className="float left" src="img/tools.webp" alt="" />
              <p>
                For design and concept I use{" "}
                <a target="_blank" href="https://www.figma.com">
                  Figma
                </a>
                .
              </p>
              <p>
                Depending on the programming language I use{" "}
                <a href="https://code.visualstudio.com">Visual Studio Code</a>,{" "}
                <a href="https://www.jetbrains.com/idea">IntelliJ IDEA</a> or{" "}
                <a href="https://www.jetbrains.com/rider">Rider</a> for the
                development.
              </p>
              <p>
                All of my source code is on{" "}
                <a href="https://github.com">GitHub</a>, managed by the desktop
                application <a href="https://www.gitkraken.com">GitKraken</a>.
              </p>
            </section>
            <hr />
            <h2>Did I con&#173;vince you?</h2>
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
              Gib deine Web&#173;seite an einen
              pro&#173;fes&#173;sio&#173;nellen Entwickler ab, damit du dich auf
              das kon&#173;zen&#173;trie&#173;ren kannst, was du liebst.
            </p>
            <Link href="/contact">
              <a className={styles["call-to-action"]}>
                Jetzt Kontakt auf&#173;nehmen
              </a>
            </Link>
            <hr />
            <section>
              <h2>Deine Webseite soll Atem&#173;beraubend aussehen?</h2>
              <img
                decoding="async"
                className="float left"
                src="/img/research.webp"
                alt=""
              />
              <p>
                Nach einem ersten Austausch entwerfe ich ein Konzept, welches
                wir zusammen durch&#173;gehen und eventuell über&#173;arbeiten.
              </p>
              <p>
                Ich habe pro&#173;fes&#173;sio&#173;nelle Erfahrung mit
                unter&#173;schied&#173;lichen Tech&#173;no&#173;lo&#173;gien und
                kann mit leich&#173;tig&#173;keit das passende für deine
                Web&#173;seite auswählen.
              </p>
            </section>
            <section>
              <h2>Designer vs Programmierer</h2>
              <img className="float right" src="img/hacker.webp" alt="" />
              <p>Ich bin ein Programmierer.</p>
              <p>
                Obwohl ich dank einiger Kurse Ahnung von Design habe, bin ich
                noch lange kein Designer. Ich kann keine Logos gestalten oder
                eine komplette Brand Identity erstellen.
              </p>
              <p>
                Worin ich jedoch hervorragend bin, ist eine Webseite zu
                erstellen, die funktioniert. Ich weiß, wie Performance,
                Sicherheit und Such&#173;maschinen&#173;optimierung
                funktionieren. Ich alles von fancy 3D-Animationen hin zu
                schlichtem 90er look alles realisieren.
              </p>
            </section>
            <section>
              <h2>Meine Tools</h2>
              <img className="float left" src="img/tools.webp" alt="" />
              <p>
                Für das Design nutze ich{" "}
                <a target="_blank" href="https://www.figma.com">
                  Figma
                </a>
                .
              </p>
              <p>
                Abhängig von der Programmiersprache nutze ich{" "}
                <a href="https://code.visualstudio.com">Visual Studio Code</a>,{" "}
                <a href="https://www.jetbrains.com/de-de/idea">IntelliJ IDEA</a>{" "}
                oder <a href="https://www.jetbrains.com/de-de/rider">Rider</a>{" "}
                für die Entwicklung.
              </p>
              <p>
                Mein gesammter Quellcode ist auf{" "}
                <a href="https://github.com">GitHub</a>, verwaltet mit der
                Desktop&#173;anwendung{" "}
                <a href="https://www.gitkraken.com">GitKraken</a>.
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
