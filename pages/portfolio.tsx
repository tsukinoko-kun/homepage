import { motion } from "framer-motion";
import type { NextPage } from "next";
import Link from "next/link";
import { AnimateOnScroll } from "../components/AnimateOnScroll";
import { Lang } from "../components/LanguageSwitcher";
import { SEO } from "../components/SEO";

import styles from "../styles/portfolio.module.scss";

const years: Array<{
  year: number;
  projects: Array<{
    name: string;
    description?: { en: string; de: string };
    lang: string[];
    href: string;
  }>;
}> = [
  {
    year: 2022,
    projects: [
      {
        name: "World Architect",
        description: {
          en: "Minecraft World Generator",
          de: "Minecraft World Generator",
        },
        lang: ["fs"],
        href: "https://yams-team.github.io",
      },
      {
        name: "Photon Project Creator",
        description: {
          en: "Create project for the Photon Framework",
          de: "Erstelle ein Projekt für das Photon Framework",
        },
        lang: ["ts", "sass", "html"],
        href: "https://photonprojectcreator.web.app",
      },
      {
        name: "Days Without Failure",
        description: {
          en: "Count the days without failure on GitHub Actions or Jenkins",
          de: "Zähle die Tage ohne Fehler auf GitHub Actions oder Jenkins",
        },
        lang: ["kt"],
        href: "https://github.com/Frank-Mayer/days-without-failure",
      },
      {
        name: "Open Props (Sass)",
        description: {
          en: "A Sass port of the Open Props CSS Library",
          de: "Eine Sass Portierung der Open Props CSS-Library",
        },
        lang: ["js"],
        href: "https://www.npmjs.com/package/open-props-sass",
      },
      {
        name: "Yet another HTML preprocessor",
        description: {
          en: "A HTML preprocessor that compiles to HTML. Allows to use npm modules and process fetch requests.",
          de: "Ein HTML-Preprocessor, der in HTML kompiliert. Ermöglicht npm Module zu verwenden und Fetch Requests zu verarbeiten.",
        },
        lang: ["ts"],
        href: "https://www.npmjs.com/package/@frank-mayer/yahp",
      },
      {
        name: "Send",
        description: {
          en: "A simple file sharing service. Encrypts files with AES/GCM 256",
          de: "Ein einfacher Datei-Sharing Service. Verschlüsselt Dateien mit AES/GCM 256",
        },
        lang: ["ts", "sass", "html"],
        href: "https://send.frank-mayer.io",
      },
      {
        name: "Cron Job Minecraft Plugin",
        lang: ["kt"],
        href: "https://github.com/Frank-Mayer/minecraft-tasker",
      },
      {
        name: "Naruto Ninjutsu Minecraft Plugin",
        lang: ["kt"],
        href: "https://github.com/Frank-Mayer/naruto-minecraft",
      },
      {
        name: "Minecraft Calculation tool",
        description: {
          en: "A tool to calculate prices of all items and blocks in Minecraft, based on prices of base items.",
          de: "Ein Tool um die Preise aller Items und Blöcke in Minecraft zu berechnen, basierend auf den Preisen der Basis Items.",
        },
        lang: ["ts", "sass", "html"],
        href: "https://github.com/Frank-Mayer/naruto-minecraft",
      },
    ],
  },
  {
    year: 2021,
    projects: [
      {
        name: "Photon",
        description: {
          en: "A static site builder that supports routing, markdown, sass and more.",
          de: "Ein Static-Site-Builder, der Routing, Markdown, Sass und mehr unterstützt.",
        },
        lang: ["ts"],
        href: "https://github.com/photon-framework",
      },
      {
        name: "www.reost.de",
        description: {
          en: "The website of the Reost Minecraft Server",
          de: "Die Website des Reost Minecraft Servers",
        },
        lang: ["ts", "sass", "html"],
        href: "https://www.reost.de",
      },
      {
        name: "magic",
        description: {
          en: "TypeScript library with useful functions and classes",
          de: "TypeScript Bibliothek mit nützlichen Funktionen und Klassen",
        },
        lang: ["ts"],
        href: "https://www.npmjs.com/package/@frank-mayer/magic",
      },
      {
        name: "Popcorn Box",
        description: {
          en: "A simple web app to manage your DVDs and Blu-Rays",
          de: "Eine einfache Web-App um deine DVDs und Blu-Rays zu verwalten",
        },
        lang: ["ts", "sass", "html"],
        href: "https://github.com/Frank-Mayer/popcornbox",
      },
    ],
  },
  {
    year: 2020,
    projects: [
      {
        name: "AlwaysSmile",
        description: {
          en: "Browser extension to automaticly redirect to Amazon Smile",
          de: "Browser-Extension um automatisch auf Amazon Smile weiterzuleiten",
        },
        lang: ["ts", "sass", "html"],
        href: "https://github.com/Frank-Mayer/AlwaysSmile",
      },
      {
        name: "CMapper",
        description: {
          en: "Web App to create class diagrams and export as image or code",
          de: "Web-App um Klassendiagramme zu erstellen und als Bild oder Code zu exportieren",
        },
        lang: ["ts", "sass", "html", "py"],
        href: "https://cmapper.web.app",
      },
    ],
  },
];

const renderYears = (lang: string) =>
  years.map(({ year, projects }) => (
    <section key={year}>
      <h2>{year}</h2>
      <ul className={styles["proj-list"]}>
        {projects.map((proj) => (
          <AnimateOnScroll motionElement={motion.li} key={proj.name}>
            <Link href={proj.href}>
              <a target="_blank">
                <p>
                  <b>{proj.name}</b>
                  {proj.description && lang in proj.description ? (
                    <i>
                      {" "}
                      -{" "}
                      {proj.description[lang as keyof typeof proj.description]}
                    </i>
                  ) : null}
                </p>
                <p className={styles["lang-list"]}>
                  {proj.lang.map((l) => (
                    <span key={proj.name + l} data-lang={l}></span>
                  ))}
                </p>
              </a>
            </Link>
          </AnimateOnScroll>
        ))}
      </ul>
    </section>
  ));

const Page: NextPage = () => (
  <>
    <h1>Portfolio</h1>

    <Lang>
      {[
        [
          "en",
          <>
            <SEO
              title="Portfolio"
              description="Here are some of my projects. Older projects on this list are no longer maintained."
              keywords={["portfolio", "projects", "code", "programming"]}
            />
            <p>
              Here are some of my projects. Older projects on this list are no
              longer maintained.
            </p>
            {renderYears("en")}
          </>,
        ],
        [
          "de",
          <>
            <SEO
              title="Portfolio"
              description="Hier sind einige meiner Projekte. Ältere Projekte dieser Liste werden nicht mehr weiterentwickelt."
              keywords={["portfolio", "projekte", "code", "programmierung"]}
            />
            <p>
              Hier sind einige meiner Projekte. Ältere Projekte dieser Liste
              werden nicht mehr weiterentwickelt.
            </p>
            {renderYears("de")}
          </>,
        ],
      ]}
    </Lang>
  </>
);

export default Page;
