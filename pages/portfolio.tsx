import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Lang } from "../components/LanguageSwitcher";
import { title } from "../lib/title";

import styles from "../styles/portfolio.module.scss";

const years = [
  {
    year: 2022,
    projects: [
      {
        name: "World Architect",
        lang: ["fs"],
        href: "https://yams-team.github.io/WorldArchitect.html",
      },
      {
        name: "Photon Project Creator",
        lang: ["ts", "sass", "html"],
        href: "https://photonprojectcreator.web.app",
      },
      {
        name: "Days Without Failure",
        lang: ["kt"],
        href: "https://github.com/Frank-Mayer/days-without-failure",
      },
      {
        name: "Open Props (Sass)",
        lang: ["js"],
        href: "https://www.npmjs.com/package/open-props-sass",
      },
      {
        name: "Yet another HTML preprocessor",
        lang: ["ts"],
        href: "https://www.npmjs.com/package/@frank-mayer/yahp",
      },
      {
        name: "Send",
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
        lang: ["ts", "sass", "html"],
        href: "https://github.com/Frank-Mayer/naruto-minecraft",
      },
    ],
  },
  {
    year: 2021,
    projects: [
      {
        name: "Photon (Static site builder)",
        lang: ["ts"],
        href: "https://github.com/photon-framework",
      },
      {
        name: "www.reost.de",
        lang: ["ts", "sass", "html"],
        href: "https://www.reost.de",
      },
      {
        name: "magic",
        lang: ["ts"],
        href: "https://www.npmjs.com/package/@frank-mayer/magic",
      },
      {
        name: "Popcorn Box",
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
        lang: ["ts", "sass", "html"],
        href: "https://github.com/Frank-Mayer/AlwaysSmile",
      },
      {
        name: "CMapper",
        lang: ["ts", "sass", "html", "py"],
        href: "https://cmapper.web.app",
      },
    ],
  },
];

const renderYears = () =>
  years.map(({ year, projects }) => (
    <section key={year}>
      <h2>{year}</h2>
      <ul className={styles["proj-list"]}>
        {projects.map((proj) => (
          <li key={proj.name}>
            <Link href={proj.href}>
              <a target="_blank">
                <p>{proj.name}</p>
                <p className={styles["lang-list"]}>
                  {proj.lang.map((l) => (
                    <span key={proj.name + l} data-lang={l}></span>
                  ))}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  ));

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
            {renderYears()}
          </>,
        ],
        [
          "de",
          <>
            <p>
              Hier sind einige meiner Projekte. Ältere Projekte dieser Liste
              werden nicht mehr weiterentwickelt.
            </p>
            {renderYears()}
          </>,
        ],
      ]}
    </Lang>
  </>
);

export default Page;
