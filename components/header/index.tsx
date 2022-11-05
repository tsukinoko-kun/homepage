import { links } from "./links";
import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";

export const Header = () => {
  const router = useRouter();

  return (
    <header>
      <nav>
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={classNames(
              "anchor",
              router.pathname === href ? "active" : false
            )}
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
};
