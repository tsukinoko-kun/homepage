type Language =
  | "TypeScript"
  | "JavaScript"
  | "HTML"
  | "Sass"
  | "CSS"
  | "F#"
  | "Rust"
  | "Kotlin"
  | "Python"
  | "Markdown"
  | "BibTeX";

type Project = {
  name: string;
  description: string;
  languages: Array<Language>;
  source?: string;
  live?: string;
  year: number;
};

export const projects: ReadonlyArray<Project> = [
  {
    name: "Blog",
    description:
      "This blog contains short summaries of topics I have studied recently.",
    languages: ["TypeScript", "Sass", "Markdown", "BibTeX"],
    source: "https://github.com/Frank-Mayer/blog",
    live: "https://blog.frank-mayer.io",
    year: 2022,
  },
  {
    name: "slix",
    description: "React powered slides framework.",
    languages: ["TypeScript"],
    source: "https://github.com/Frank-Mayer/slix",
    year: 2022,
  },
  {
    name: "World Architect",
    description: "Minecraft World Generator.",
    languages: ["F#"],
    live: "https://yams-team.github.io",
    year: 2022,
  },
  {
    name: "Photon Project Creator",
    description: "Create project for the Photon Framework.",
    languages: ["TypeScript", "Sass", "HTML"],
    live: "https://photonprojectcreator.web.app",
    source: "https://github.com/photon-framework/project-creator",
    year: 2022,
  },
  {
    name: "Days Without Failure",
    description: "Count the days without failure on GitHub Actions or Jenkins.",
    languages: ["Kotlin"],
    source: "https://github.com/Frank-Mayer/days-without-failure",
    year: 2022,
  },
  {
    name: "Open Props (Sass)",
    description: "A Sass port of the Open Props CSS Library.",
    languages: ["JavaScript", "Sass"],
    live: "https://www.npmjs.com/package/open-props-sass",
    source: "https://github.com/Frank-Mayer/open-props-sass",
    year: 2022,
  },
  {
    name: "Yet another HTML preprocessor",
    description:
      "A HTML preprocessor that compiles to HTML. Allows to use npm modules and process fetch requests.",
    languages: ["TypeScript"],
    live: "https://www.npmjs.com/package/@frank-mayer/yahp",
    source: "https://github.com/Frank-Mayer/yahp",
    year: 2022,
  },
  {
    name: "Send",
    description:
      "A simple file sharing service. Encrypts files with AES/GCM 256.",
    languages: ["TypeScript", "Sass", "HTML"],
    live: "https://send.frank-mayer.de",
    source: "https://github.com/Frank-Mayer/send",
    year: 2022,
  },
  {
    name: "Cron Job Minecraft Plugin",
    description: "A Minecraft plugin that allows to run commands as cron jobs.",
    languages: ["Kotlin"],
    source: "https://github.com/Frank-Mayer/minecraft-tasker",
    year: 2022,
  },
  {
    name: "Naruto Ninjutsu Minecraft Plugin",
    description: "A plugin that brings the Naruto Ninjutsu to Minecraft.",
    languages: ["Kotlin"],
    source: "https://github.com/Frank-Mayer/naruto-minecraft",
    year: 2022,
  },
  {
    name: "Photon",
    description:
      "A static site builder that supports routing, markdown, sass and more.",
    languages: ["TypeScript"],
    live: "https://github.com/photon-framework",
    year: 2021,
  },
  {
    name: "www.reost.de",
    description: "The website of the Minecraft community server Reost.",
    languages: ["TypeScript", "Sass", "HTML"],
    live: "https://www.reost.de",
    year: 2021,
  },
  {
    name: "magic",
    description: "TypeScript library with useful functions and classes.",
    languages: ["TypeScript"],
    live: "https://www.npmjs.com/package/@frank-mayer/magic",
    year: 2021,
  },
  {
    name: "Popcorn Box",
    description:
      "A simple web app to manage your DVDs and Blu-Rays. It gives recommendations based on your collection using Brain.js.",
    languages: ["TypeScript", "Sass", "HTML"],
    source: "https://github.com/Frank-Mayer/popcornbox",
    year: 2021,
  },
  {
    name: "AlwaysSmile",
    description: "Browser extension to automaticly redirect to Amazon Smile.",
    languages: ["TypeScript", "Sass", "HTML"],
    source: "https://github.com/Frank-Mayer/AlwaysSmile",
    year: 2020,
  },
  {
    name: "CMapper",
    description:
      "Web App to create class diagrams and export as image or code. It also checks for logical errors.",
    languages: ["TypeScript", "Sass", "HTML", "Python"],
    live: "https://cmapper.web.app",
    year: 2020,
  },
];

export const years: ReadonlyArray<number> = Array.from(
  new Set(projects.map((p) => p.year))
);
