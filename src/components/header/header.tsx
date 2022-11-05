import { Link } from "@builder.io/qwik-city";
import { links } from "./links";
import c from "classnames";

export default (props: { pathname: string }) => (
  <header>
    <nav>
      {links.map(({ href, icon: Icon, label }) => (
        <Link
          href={href}
          class={c("anchor", props.pathname === href ? "active" : false)}
        >
          <div>
            <Icon />
          </div>
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  </header>
);
