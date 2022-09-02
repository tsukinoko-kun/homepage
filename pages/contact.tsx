import type { NextPage } from "next";
import Head from "next/head";
import { Lang } from "../components/LanguageSwitcher";
import { title } from "../lib/title";

const Page: NextPage = () => (
  <Lang>
    {[
      [
        "en",
        <>
          <Head>
            <title>{title("Contact")}</title>
          </Head>
          <h1>Contact</h1>
          <form action="https://eo4hr3kdzumsq1q.m.pipedream.net" method="post">
            <label>
              E-Mail{" "}
              <input name="mail" type="email" autoComplete="email" required />
            </label>

            <label>
              Message<span>(max. 512 characters)</span>
              <textarea
                name="message"
                autoCorrect="on"
                minLength={10}
                maxLength={512}
                required
              ></textarea>
            </label>

            <input type="submit" value="Send" />

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
          <Head>
            <title>{title("Kontakt")}</title>
          </Head>
          <h1>Kontakt</h1>
          <form action="https://eo4hr3kdzumsq1q.m.pipedream.net" method="post">
            <label>
              E-Mail{" "}
              <input name="mail" type="email" autoComplete="email" required />
            </label>

            <label>
              Nachricht<span>(max. 512 Zeichen)</span>
              <textarea
                name="message"
                autoCorrect="on"
                minLength={10}
                maxLength={512}
                required
              ></textarea>
            </label>

            <input type="submit" value="Absenden" />

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
