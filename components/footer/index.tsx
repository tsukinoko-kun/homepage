import styles from "./footer.module.scss";

export const Footer = () => (
  <footer className={styles.container}>
    <a
      className={styles.link}
      target="_blank"
      href="https://github.com/Frank-Mayer"
      rel="noopener noreferrer"
    >
      GitHub
    </a>
    <a
      className={styles.link}
      target="_blank"
      href="https://anilist.co/user/tsukinoko"
      rel="noopener noreferrer"
    >
      AniList
    </a>
    <a
      className={styles.link}
      target="_blank"
      href="https://www.linkedin.com/in/frank-mayer-b85677214"
      rel="noopener noreferrer"
    >
      LinkedIn
    </a>
    <a
      rel="me noopener noreferrer"
      className={styles.link}
      target="_blank"
      href="https://hello.2heng.xin/@tsukinoko"
    >
      Mastodon
    </a>
  </footer>
);
