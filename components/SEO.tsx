import Head from "next/head";

type Props = {
  title: string;
  description: string;
  keywords: Array<string>;
};

export const SEO = (props: Props) => {
  const title = props.title ? `Frank Mayer \\\\ ${props.title}` : "Frank Mayer";

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="twitter:title" content={title} />

      <meta name="description" content={props.description} />
      <meta property="og:description" content={props.description} />
      <meta property="twitter:description" content={props.description} />

      <meta
        name="keywords"
        content={props.keywords.map((x) => x.toLowerCase()).join(", ")}
      />
    </Head>
  );
};
