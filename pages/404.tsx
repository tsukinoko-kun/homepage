import { PrimaryContainer } from "../components/container";
import Link from "next/link";

export const getStaticProps = async () => ({
  props: {
    title: "404",
    description: "This page does not exist",
  },
});

const Page = () => (
  <>
    <PrimaryContainer
      title="404"
      description="Page not found"
      background="rect"
    />

    <section className="section">
      <h2>This is not the page you are looking for!</h2>
      <p>
        Maybe try the{" "}
        <Link scroll={false} href="/">
          home page
        </Link>
        ?
      </p>
    </section>
  </>
);

export default Page;
