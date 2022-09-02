import Link from "next/link";

export const Nav = () => (
  <nav>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/portfolio">
      <a>Portfolio</a>
    </Link>
    <Link href="/contact">
      <a>Contact</a>
    </Link>
  </nav>
);
