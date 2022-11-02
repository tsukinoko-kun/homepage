import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PrimaryContainer } from "../../components/container";
import styles from "./style.css?inline";
import { projects, years } from "./projects";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <PrimaryContainer
        title="Portfolio"
        description="Here are some of my projects. Older projects on this list are no longer maintained."
        cta={{
          label: "My GitHub",
          href: "https://github.com/Frank-Mayer",
        }}
        background="cubes"
      />

      {years.map((year) => (
        <section key={year}>
          <h2 id={year.toString()}>{year}</h2>
          <ul class="projects">
            {projects
              .filter((project) => project.year === year)
              .map((project) => (
                <li
                  class="project-container"
                  key={project.name}
                  id={project.name
                    .replace(/\s+/g, "-")
                    .toLowerCase()
                    .replace(/[^a-z0-9-]+/g, "")}
                >
                  <p>{"{"}</p>
                  <p class="indent-1">
                    <span class="key">name</span>:{" "}
                    <span class="string">{project.name}</span>,
                  </p>
                  <p class="indent-1">
                    <span class="key">description</span>:{" "}
                    <span class="string">{project.description}</span>,
                  </p>
                  <p class="indent-1">
                    <span class="key">languages</span>: [
                  </p>
                  {project.languages.map((language) => (
                    <p class="indent-2">
                      <span class="string">{language}</span>,
                    </p>
                  ))}
                  {project.live && (
                    <a
                      class="indent-1"
                      href={project.live}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span class="key">live</span>:{" "}
                      <span class="url string">{project.live}</span>,
                    </a>
                  )}
                  {project.source && (
                    <a
                      class="indent-1"
                      href={project.source}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span class="key">source</span>:{" "}
                      <span class="url string">{project.source}</span>,
                    </a>
                  )}
                  <p class="indent-1">],</p>
                  <p>{"}"}</p>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </>
  );
});

export const head: DocumentHead = {
  title: "Portfolio",
};
