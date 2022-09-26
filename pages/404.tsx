import { NextPage } from "next";
import { Lang } from "../components/LanguageSwitcher";
import { SEO } from "../components/SEO";

const Page: NextPage = () => (
  <Lang>
    {[
      [
        "en",
        <>
          <SEO
            title="Page not found"
            description="The page you are looking for does not exist"
            keywords={["404", "not found", "error"]}
          />
          <h1>404</h1>
          <p>Page not found</p>
        </>,
      ],
      [
        "de",
        <>
          <SEO
            title="Seite nicht gefunden"
            description="Die gesuchte Seite existiert nicht"
            keywords={["404", "nicht gefunden", "error"]}
          />
          <h1>404</h1>
          <p>Seite nicht gefunden</p>
        </>,
      ],
    ]}
  </Lang>
);

export default Page;
