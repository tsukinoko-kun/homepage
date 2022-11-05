import { links } from "./links";
import c from "classnames";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();

  return (
    <header>
      <nav>
        {links.map(({ href, icon: Icon, label }) => (
          <a
            key={href}
            href={href}
            className={c("anchor", router.pathname === href ? "active" : false)}
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
};
