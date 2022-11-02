import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import classNames from "classnames";
import styles from "./container.css?inline";

type Props = {
  title: string;
  description: string;
  cta?: {
    label: string;
    href: string;
  };
  background: "shutter" | "cubes" | "rect" | "triangle";
};

export const PrimaryContainer = component$((props: Props) => {
  useStylesScoped$(styles);

  return (
    <div class={classNames("container", "primary", props.background)}>
      <h1 dangerouslySetInnerHTML={props.title}></h1>
      <p dangerouslySetInnerHTML={props.description}></p>
      {props.cta && (
        <Link
          target={props.cta.href.startsWith("http") ? "_blank" : undefined}
          style={{
            textDecoration: "none",
            background: "var(--color-primary-container-background)",
            color: "var(--color-on-primary-container)",
            fontSize: "var(--title-l-font-size)",
            fontWeight: "var(--title-l-font-weight)",
            lineHeight: "var(--title-l-line-height)",
            letterSpacing: "var(--title-l-letter-spacing)",
            padding: "2rem 3rem",
            borderRadius: "3rem",
            cursor: "pointer",
          }}
          href={props.cta.href}
        >
          {props.cta.label}
        </Link>
      )}
    </div>
  );
});
