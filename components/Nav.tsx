import Link from "next/link";
import { useRouter } from "next/router";
import type { NextRouter } from "next/router";
import type { ReactNode } from "react";
import { Lang } from "./LanguageSwitcher";

const Anchor = (props: {
  href: string;
  children: ReactNode;
  router: NextRouter;
}) => {
  const classList = new Array<string>();
  if (props.router.pathname === props.href) {
    classList.push("active");
  }
  if (props.href === "/") {
    classList.push("home");
  }

  return (
    <Link href={props.href}>
      <a hrefLang={props.router.locale} className={classList.join(" ")}>
        {props.children}
      </a>
    </Link>
  );
};

export const Nav = () => {
  const router = useRouter();
  return (
    <nav>
      <Anchor href="/" router={router}>
        <Lang>
          {[
            ["en", <>Home</>],
            ["de", <>Hauptseite</>],
          ]}
        </Lang>
      </Anchor>
      <Anchor href="/portfolio" router={router}>
        Portfolio
      </Anchor>
      <Anchor href="/contact" router={router}>
        <Lang>
          {[
            ["en", <>Contact</>],
            ["de", <>Kontakt</>],
          ]}
        </Lang>
      </Anchor>
    </nav>
  );
};
