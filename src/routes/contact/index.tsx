import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { PrimaryContainer } from "../../components/container";
import { Input } from "./Input";
import styles from "./style.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const loc = useLocation();

  return (
    <>
      <PrimaryContainer
        title="Contact"
        description="Contact me for more information"
        background="triangle"
      />
      <form action="https://eo4hr3kdzumsq1q.m.pipedream.net" method="post">
        <Input
          label="E-Mail"
          placeholder="your@email.com"
          name="mail"
          type="email"
          autoComplete="email"
          required
        />
        <Input
          label="Message (max. 512 characters)"
          placeholder="Your message..."
          name="message"
          type="textarea"
          minLength={10}
          maxLength={512}
          required
        />
        <input type="submit" value="Absenden" />
        <input type="hidden" name="from" value={loc.href} />
      </form>
    </>
  );
});

export const head: DocumentHead = {
  title: "Contact",
};
