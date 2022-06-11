import { existsSync, promises as fs } from "fs";
import { join, relative } from "path";
// import { yahp } from "@frank-mayer/yahp";
import showdown from "showdown";

// h1 role heading
showdown.extension("heading", () => ({
  type: "lang",
  regex: /^(#+)\s*(.*?)\s*#*$/,
  replace: (txt, level, text) => {
    if (level === 1) {
      return `<h1 role="heading">${text}</h1>`;
    } else {
      return `<h${level}>${text}</h${level}>`;
    }
  },
}));

showdown.extension("anchor", () => ({
  type: "output",
  regex: /<a href="(.*?)">(.*?)<\/a>/gi,
  replace: (txt, href, text) => {
    if (href.startsWith(".") || href.startsWith("/")) {
      return `<a data-route="${href}">${text}</a>`;
    } else {
      return `<a href="${href}" target="_blank">${text}</a>`;
    }
  },
}));

const md = new showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  noHeaderId: true,
  parseImgDimensions: true,
  ghCodeBlocks: true,
  emoji: true,
  underline: true,
  extensions: ["heading", "anchor"],
});

const processDir = "./src";

/**
 * @type {Array<string>}
 */
const gitignore = ["# this file is auto-generated", "# do not edit manually!"];

/**
 * @param {string} path
 */
const ignore = (path) => {
  gitignore.push(relative(processDir, path));
};

// eslint-disable-next-line space-before-function-paren
const fromDir = async (startPath) => {
  if (!existsSync(startPath)) {
    return;
  }

  const files = await fs.readdir(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = join(startPath, files[i]);
    const stat = await fs.lstat(filename);
    if (stat.isDirectory()) {
      await fromDir(filename);
    } /*else if (filename.endsWith(".yahp")) {
      console.debug(`Found input file ${filename}`);
      const newFilename = filename.substring(0, filename.length - 4) + "html";
      await fs.writeFile(
        newFilename,
        await yahp(await fs.readFile(filename, "utf-8"))
      );
      ignore(newFilename);
    }*/ else if (filename.endsWith(".md")) {
      console.debug(`Found input file ${filename}`);
      const newFilename = filename.substring(0, filename.length - 2) + "html";
      await fs.writeFile(
        newFilename,
        md.makeHtml(await fs.readFile(filename, "utf-8"))
      );
      ignore(newFilename);
    }
  }
};

await fromDir(processDir);
await fs.writeFile(join(processDir, ".gitignore"), gitignore.join("\n"));
