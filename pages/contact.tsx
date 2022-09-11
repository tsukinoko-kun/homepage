import type { NextPage } from "next";
import { Lang } from "../components/LanguageSwitcher";
import { SEO } from "../components/SEO";

import styles from "../styles/contact.module.scss";

const Page: NextPage = () => (
  <Lang>
    {[
      [
        "en",
        <>
          <SEO
            title="Contact"
            description="Contact me via email to start a project or just to say hello"
            keywords={["contact", "email", "hello"]}
          />
          <h1>Contact</h1>
          <form
            className={styles.form}
            action="https://eo4hr3kdzumsq1q.m.pipedream.net"
            method="post"
          >
            <label className={styles.field}>
              E-Mail{" "}
              <input
                className={styles["field-input"]}
                placeholder="your@email.com"
                name="mail"
                type="email"
                autoComplete="email"
                required
              />
            </label>

            <label className={styles.field}>
              Message (max. 512 characters)
              <textarea
                className={styles["field-input"]}
                placeholder="Your message..."
                name="message"
                autoCorrect="on"
                minLength={10}
                maxLength={512}
                required
              ></textarea>
            </label>

            <input className={styles.submit} type="submit" value="Send" />

            <input
              type="hidden"
              name="from"
              value="https://frank-mayer.io/contact"
            />
          </form>
        </>,
      ],
      [
        "de",
        <>
          <SEO
            title="Kontakt"
            description="Kontaktiere mich und starte ein Projekt mit mir"
            keywords={["kontakt", "kontaktieren", "kontaktformular"]}
          />
          <h1>Kontakt</h1>
          <form
            className={styles.form}
            action="https://eo4hr3kdzumsq1q.m.pipedream.net"
            method="post"
          >
            <label className={styles.field}>
              E-Mail{" "}
              <input
                className={styles["field-input"]}
                placeholder="deine@email.de"
                name="mail"
                type="email"
                autoComplete="email"
                required
              />
            </label>

            <label className={styles.field}>
              Nachricht (max. 512 Zeichen)
              <textarea
                className={styles["field-input"]}
                placeholder="Deine Nachricht..."
                name="message"
                autoCorrect="on"
                minLength={10}
                maxLength={512}
                required
              ></textarea>
            </label>

            <input className={styles.submit} type="submit" value="Absenden" />

            <input
              type="hidden"
              name="from"
              value="https://frank-mayer.io/contact"
            />
          </form>
        </>,
      ],
    ]}
  </Lang>
);

export default Page;
