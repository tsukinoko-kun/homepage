import { links } from "./links";
import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./header.module.scss";

export const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={classNames(
              styles.link,
              router.pathname === href ? styles.active : false
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
