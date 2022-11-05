import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import Header from "../components/header";
import Footer from "../components/footer";
import { useLocation } from "@builder.io/qwik-city";
import headerStyles from "../components/header/header.css";

export default component$(() => {
  const pathname = useLocation().pathname;
  useStylesScoped$(headerStyles);

  return (
    <>
      <Header pathname={pathname} />
      <main>
        <Slot />
        <Footer />
      </main>
    </>
  );
});
