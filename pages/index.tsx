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
            <section>
              <h2>Deine Webseite soll Atem&shy;beraubend aussehen?</h2>
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
                Sicherheit und Such&shy;maschinen&shy;optimierung funktionieren.
                Ich alles von fancy 3D-Animationen hin zu schlichtem 90er look
                alles realisieren.
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
                Desktop&shy;anwendung{" "}
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
