import classNames from "classnames";
import Link from "next/link";
import styles from "./container.module.scss";

type Props = {
  title: string;
  description: string;
  cta?: {
    label: string;
    href: string;
  };
  background: "shutter" | "cubes" | "rect" | "triangle";
};

export const PrimaryContainer = (props: Props) => {
  return (
    <div className={classNames(styles.primary, styles[props.background])}>
      <h1 dangerouslySetInnerHTML={{ __html: props.title }}></h1>
      <p dangerouslySetInnerHTML={{ __html: props.description }}></p>
      {props.cta && (
        <Link
          scroll={false}
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
};
