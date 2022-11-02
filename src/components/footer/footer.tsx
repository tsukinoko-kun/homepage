import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./footer.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <footer className="footer">
      <a
        target="_blank"
        href="https://github.com/Frank-Mayer"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <a
        target="_blank"
        href="https://anilist.co/user/tsukinoko"
        rel="noopener noreferrer"
      >
        AniList
      </a>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/frank-mayer-b85677214"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    </footer>
  );
});
