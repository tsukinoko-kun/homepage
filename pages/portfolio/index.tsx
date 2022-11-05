import { PrimaryContainer } from "../../components/container";
import { projects, years } from "./projects";
import styles from "./index.module.scss";
import classNames from "classnames";

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
        <ul className={styles.projects}>
          {projects
            .filter((project) => project.year === year)
            .map((project) => (
              <li
                className={styles["project-container"]}
                key={project.name}
                id={project.name
                  .replace(/\s+/g, "-")
                  .toLowerCase()
                  .replace(/[^a-z0-9-]+/g, "")}
              >
                <p>{"{"}</p>
                <p className={styles["indent-1"]}>
                  <span className={styles.key}>name</span>:{" "}
                  <span className={styles.string}>
                    &quot;{project.name}&quot;
                  </span>
                  ,
                </p>
                <p className={styles["indent-1"]}>
                  <span className={styles.key}>description</span>:{" "}
                  <span className={styles.string}>
                    &quot;{project.description}&quot;
                  </span>
                  ,
                </p>
                <p className={styles["indent-1"]}>
                  <span className={styles.key}>languages</span>: [
                </p>
                {project.languages.map((language, i) => (
                  <p className={styles["indent-2"]} key={i}>
                    <span className={styles.string}>
                      &quot;{language}&quot;
                    </span>
                    ,
                  </p>
                ))}
                <p className={styles["indent-1"]}>],</p>
                {project.live && (
                  <a
                    className={styles["indent-1"]}
                    href={project.live}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className={styles.key}>live</span>:{" "}
                    <span className={classNames(styles.url, styles.string)}>
                      &quot;{project.live}&quot;
                    </span>
                    ,
                  </a>
                )}
                {project.source && (
                  <a
                    className={styles["indent-1"]}
                    href={project.source}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className={styles.key}>source</span>:{" "}
                    <span className={classNames(styles.url, styles.string)}>
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

Page.pageTitle = "Portfolio";

export default Page;
