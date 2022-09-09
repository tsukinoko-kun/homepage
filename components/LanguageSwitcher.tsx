import { useRouter } from "next/router";
import type { ReactElement } from "react";

type Props = {
  children: [["en", ReactElement], ["de", ReactElement]];
};

export const Lang = (props: Props): ReactElement | null => {
  const { locale } = useRouter();
  const localized = props.children.find((x) => x[0] === locale);
  if (localized) {
    return localized[1];
  } else {
    const enLocalized = props.children.find((x) => x[0] === "en");
    if (enLocalized) {
      return enLocalized[1];
    }
  }
  return null;
};
