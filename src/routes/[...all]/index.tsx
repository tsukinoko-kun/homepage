import { component$ } from "@builder.io/qwik";
import { PrimaryContainer } from "../../components/container";
import { Link, type RequestHandler, useLocation } from "@builder.io/qwik-city";

export const onGet: RequestHandler<{}> = (request) => {
  const redirectRegex = /^\/(de|en)\/(home|portfolio|contact)/g;
  const url = new URL(request.url);
  const match = redirectRegex.exec(url.pathname);
  if (match) {
    request.response.status = 301;
    request.response.headers.set("Location", `/${match[2]}`);
  } else {
    request.response.status = 404;
  }
};

export default component$(() => {
  const loc = useLocation();

  return (
    <>
      <PrimaryContainer
        background="rect"
        title="404"
        description={`Path "${loc.pathname}" not found`}
      />
      <h2>This is not the page you are looking for.</h2>
      <p>Sorry, we couldn't find the page you were looking for.</p>
      <p>
        Try the{" "}
        <Link
          style={{
            color: "var(--color-primary)",
            textDecoration: "underline",
          }}
          href="/"
        >
          Home page
        </Link>
        ?
      </p>
    </>
  );
});