import { useRouter } from "next/router";
import { PrimaryContainer } from "../../components/container";
import { Input } from "../../components/Input";
import styles from "./contact.module.scss";

const Page = () => {
  const router = useRouter();

  return (
    <>
      <PrimaryContainer
        title="Contact"
        description="Contact me for more information"
        background="triangle"
      />
      <form
        action="https://eo4hr3kdzumsq1q.m.pipedream.net"
        method="post"
        className={styles.form}
      >
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
        <input
          type="hidden"
          name="from"
          value={"https://www.frank-mayer.io" + router.pathname}
        />
      </form>
    </>
  );
};

Page.displayName = "Contact";

export default Page;
