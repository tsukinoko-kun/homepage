const fs = require("node:fs");
const path = require("node:path");

const dist = "./dist/";
const src = "./src/";

const mainLocation = "https://frank-mayer.io";

const dateTime = (() => {
  const d = new Date();
  d.setTime(d.getTime() + 10 * 60 * 1000);
  return d.toISOString();
})();

/**
 * @param {string} directory
 */
const clearDir = (directory) => {
  for (const file of fs.readdirSync(directory)) {
    if (!fs.existsSync(file)) {
      continue;
    }

    fs.rmSync(path.join(directory, file), {
      force: true,
      maxRetries: 3,
      recursive: true,
      retryDelay: 100,
    });
  }
};

if (fs.existsSync(dist)) {
  clearDir(dist);
} else {
  fs.mkdirSync(dist);
}

//#region sitemap.xml

const p1 = "  ";
const p2 = p1 + p1;

const pathSet = [
  "/portfolio",
  "/info",
  "/links",
  "/de/portfolio",
  "/de/info",
  "/de/links",
  "/en/portfolio",
  "/en/info",
  "/en/links",
];

/**
 * 1 -> 1.00
 *
 * 0.2 -> 0.02
 *
 * 1.2345 -> 1.23
 *
 * @param {number} num input number
 */
const fn = (num) => (Math.round(num * 100) / 100).toFixed(2);

/**
 * @param {string} loc location
 * @param {number} pr priority
 */
const createUrl = (loc, pr) =>
  [
    `${p1}<url>`,
    `${p2}<loc>${loc}</loc>`,
    `${p2}<lastmod>${dateTime}</lastmod>`,
    `${p2}<priority>${fn(pr)}</priority>`,
    `${p1}</url>`,
  ].join("\n");

const xml = [
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
  createUrl(mainLocation, 1),
];

for (const path of pathSet) {
  xml.push(createUrl(mainLocation + path, 0.8));
}

xml.push("</urlset>\n");

fs.writeFileSync(`${dist}sitemap.xml`, xml.join("\n"));
//#endregion

//#region robots.txt
fs.copyFileSync(`${src}robots.txt`, `${dist}robots.txt`);
//#endregion

//#region Parcel
require("node:child_process").execSync(
  "npx parcel build 'src/index.html' 'src/**/*.html' --no-source-maps --no-cache"
);
//#endregion
