import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import styles from "./header.css?inline";
import { links } from "./links";

export default component$(() => {
  useStylesScoped$(styles);

  const path = useLocation().pathname;

  return (
    <header>
      <nav>
        {links.map(({ href, icon: Icon, label }) => (
          <a href={href} className={path === href ? "active" : ""}>
            <div>
              <Icon />
            </div>
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </header>
  );
});
