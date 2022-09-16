import Link from "next/link";
import { useRouter } from "next/router";

export const Footer = () => {
  const router = useRouter();
  return (
    <footer>
      <Link href="https://github.com/Frank-Mayer">
        <a hrefLang="en-US" target="_blank">
          GitHub
        </a>
      </Link>
      <Link href="https://anilist.co/user/tsukinoko">
        <a hrefLang="en-US" target="_blank">
          AniList
        </a>
      </Link>
      <Link href="https://www.linkedin.com/in/frank-mayer-b85677214">
        <a hrefLang={router.locale} target="_blank">
          LinkedIn
        </a>
      </Link>
    </footer>
  );
};
