import type { NextApiRequest, NextApiResponse } from "next/types";

const cdata = (content: string) => `<![CDATA[ ${content} ]]>`;

const item = (title: string, description: string, link: string, date: Date) => {
  return [
    `<item>`,
    `<title>${cdata(title)}</title>`,
    `<description>${cdata(description)}</description>`,
    `<link>${link}</link>`,
    `<pubDate>${(date as any).toGMTString()}</pubDate>`,
    `</item>`,
  ].join("");
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Array<{ a: string }>>
) {
  res
    .status(200)
    .setHeader("Content-Type", "text/xml")
    .write(
      [
        '<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" version="2.0">',
        "<script/>",
        "<channel>",
        "<title><![CDATA[ ILIAS To-Do ]]></title>",
        "<description><![CDATA[ Parsed from ILIAS To-Do list ]]></description>",
        "<link>https://ilias.hs-heilbronn.de/ilias.php</link>",
        "<image>",
        "<url>https://ilias.hs-heilbronn.de/templates/default/images/HeaderIcon.svg</url>",
        "<title><![CDATA[ HHN ILIAS ]]></title>",
        "<link>https://ilias.hs-heilbronn.de/ilias.php</link>",
        "</image>",
        "<generator>https://www.frank-mayer.io</generator>",
        `<lastBuildDate>${(new Date() as any).toGMTString()}</lastBuildDate>`,
        '<atom:link href="https://www.frank-mayer.io/api/ilias.xml" rel="self" type="application/rss+xml"/>',
        "<language><![CDATA[ de ]]></language>",
        item(
          "Test title",
          "Test description",
          "https://www.frank-mayer.io",
          new Date()
        ),
        "</channel>",
        "</rss>",
      ]
        .flat()
        .join("")
    );

  res.end();
}
