import { PrimaryContainer } from "../../components/container";
import { projects, years } from "../../data/projects";
import classNames from "classnames";

export const getStaticProps = async () => ({
  props: {
    title: "Portfolio",
    description: "Here are some of my projects",
  },
});

const Page = () => (
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
        <ul className="projects">
          {projects
            .filter((project) => project.year === year)
            .map((project) => (
              <li
                className="project-container"
                key={project.name}
                id={project.name
                  .replace(/\s+/g, "-")
                  .toLowerCase()
                  .replace(/[^a-z0-9-]+/g, "")}
              >
                <p>{"{"}</p>
                <p className="indent-1">
                  <span className="key">name</span>:{" "}
                  <span className="string">&quot;{project.name}&quot;</span>,
                </p>
                <p className="indent-1">
                  <span className="key">description</span>:{" "}
                  <span className="string">
                    &quot;{project.description}&quot;
                  </span>
                  ,
                </p>
                <p className="indent-1">
                  <span className="key">languages</span>: [
                </p>
                {project.languages.map((language, i) => (
                  <p className="indent-2" key={i}>
                    <span className="string">&quot;{language}&quot;</span>,
                  </p>
                ))}
                <p className="indent-1">],</p>
                {project.live && (
                  <a
                    className="indent-1"
                    href={project.live}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="key">live</span>:{" "}
                    <span className={classNames("url", "string")}>
                      &quot;{project.live}&quot;
                    </span>
                    ,
                  </a>
                )}
                {project.source && (
                  <a
                    className="indent-1"
                    href={project.source}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="key">source</span>:{" "}
                    <span className={classNames("url", "string")}>
                      &quot;{project.source}&quot;
                    </span>
                    ,
                  </a>
                )}
                <p>{"}"}</p>
              </li>
            ))}
        </ul>
      </section>
    ))}
  </>
);

export default Page;
