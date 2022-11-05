import { links } from "./links";
import c from "classnames";

export default (props: { pathname: string }) => (
  <header>
    <nav>
      {links.map(({ href, icon: Icon, label }) => (
        <a
          href={href}
          class={c("anchor", props.pathname === href ? "active" : false)}
        >
          <div>
            <Icon />
          </div>
          <span>{label}</span>
        </a>
      ))}
    </nav>
  </header>
);
