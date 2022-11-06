import { PrimaryContainer } from "../components/container";
import Image from "next/image";

export const getStaticProps = async () => ({
  props: {
    title: "Home",
    description: "Frank Mayer's personal website",
  },
});

const Page = () => {
  return (
    <>
      <PrimaryContainer
        title="Get a website,<br/>the professional way"
        description="Let a pro&shy;fes&shy;sion&shy;al de&shy;vel&shy;op&shy;er take care of your web&shy;site, so you can focus on what you love."
        cta={{
          label: "Get in touch",
          href: "/contact",
        }}
        background="shutter"
      />

      <section className="section">
        <Image
          width={256}
          height={197}
          decoding="async"
          src="/images/research.webp"
          alt=""
        />
        <h2>Your website should look breathtaking?</h2>
        <p>
          After an initial ex&#173;change, I create a concept that we review
          together and possibly revise.
        </p>
        <p>
          I have pro&#173;fes&#173;sion&#173;al experience with different
          tech&#173;nolo&#173;gies and can easily choose the right one for your
          web&#173;site.
        </p>
      </section>

      <section className="section">
        <Image width={256} height={389} src="/images/hacker.webp" alt="" />
        <h2>Designer vs Programmer</h2>
        <p>I am a programmer.</p>
        <p>
          Although I know a lot about design thanks to some courses, I am far
          from being a designer. I can&apos;t design logos or create a complete
          brand identity.
        </p>
        <p>
          What I am good at is creating a website that works. I know how
          performance, security and search engine optimization work. I can
          implement everything from fancy 3D animations to simple 90s look.
        </p>
      </section>
      <section className="section">
        <Image width={256} height={250} src="/images/tools.webp" alt="" />
        <h2>My Tools</h2>
        <p>
          For design and concept I use{" "}
          <a
            hrefLang="en-US"
            target="_blank"
            href="https://www.figma.com"
            rel="noreferrer"
          >
            Figma
          </a>
          .
        </p>
        <p>
          Depending on the programming language I use{" "}
          <a
            hrefLang="en-US"
            target="_blank"
            href="https://code.visualstudio.com"
            rel="noreferrer"
          >
            Visual Studio Code
          </a>
          ,{" "}
          <a
            hrefLang="en-US"
            target="_blank"
            href="https://www.jetbrains.com/idea"
            rel="noreferrer"
          >
            IntelliJ IDEA
          </a>{" "}
          or{" "}
          <a
            hrefLang="es-US"
            target="_blank"
            href="https://www.jetbrains.com/rider"
            rel="noreferrer"
          >
            Rider
          </a>{" "}
          for the development.
        </p>
        <p>
          All of my source code is on{" "}
          <a
            hrefLang="en-US"
            target="_blank"
            href="https://github.com"
            rel="noreferrer"
          >
            GitHub
          </a>
          , managed by the desktop application{" "}
          <a
            hrefLang="en-US"
            target="_blank"
            href="https://www.gitkraken.com"
            rel="noreferrer"
          >
            GitKraken
          </a>
          .
        </p>
      </section>
    </>
  );
};

export default Page;
