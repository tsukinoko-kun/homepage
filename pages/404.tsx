import { PrimaryContainer } from "../components/container";
import Link from "next/link";
import styles from "./home.module.scss";

const Page = () => (
  <>
    <PrimaryContainer
      title="404"
      description="Page not found"
      background="rect"
    />

    <section className={styles.section}>
      <h2>This is not the page you are looking for!</h2>
      <p>
        Maybe try the <Link href="/">home page</Link>?
      </p>
    </section>
  </>
);

export default Page;
