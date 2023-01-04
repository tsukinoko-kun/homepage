import type { NextApiRequest, NextApiResponse } from "next"
import "@frank-mayer/stream"
import { parse } from "node-html-parser"
import { Option, Result } from "@frank-mayer/opsult"

export interface RepoData {
    name: string
    url: string
    description: string
    language: string
}

const handlerAsync = async (req: NextApiRequest, res: NextApiResponse<Array<RepoData>|Error>) => {
    getPinnedReposAsync()
        .then((pinnedRepos) => {
            pinnedRepos.match(
                (repos) => res.status(200).json(repos),
                (err) => res.status(500).json(err)
            )
        })
        .catch((err) => {
            res.status(500).json(err)
        })
}

export default handlerAsync

const getPinnedReposAsync = async (): Promise<Result<Array<RepoData>, Error>> => {
    try {
        const repoHtmlResponse = await fetch("https://github.com/Frank-Mayer")
        const repoHtml = await repoHtmlResponse.text()
        const root = parse(repoHtml)
        return Result.Ok(root.querySelectorAll(".pinned-item-list-item-content")
            .stream()
            .map((repoPinEl): Option<RepoData> => {
                const repoTitleEl = repoPinEl.querySelector(".repo")
                if (!repoTitleEl) {
                    return Option.None()
                }

                const repoAnchorEl = repoPinEl.querySelector("a")
                if (!repoAnchorEl) {
                    return Option.None()
                }
                if (!repoAnchorEl.hasAttribute("href")) {
                    return Option.None()
                }
                const url = new URL(repoAnchorEl.getAttribute("href")!.trim(), "https://github.com")
                url.hash = "readme"

                const repoDescriptionEl = repoPinEl.querySelector(".pinned-item-desc")
                if (!repoDescriptionEl) {
                    return Option.None()
                }

                const repoLanguageEl = repoPinEl.querySelector("[itemprop=programmingLanguage]")
                if (!repoLanguageEl) {
                    return Option.None()
                }

                return Option.Some({
                    name: repoTitleEl.innerText.trim(),
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    url: url.href,
                    description: repoDescriptionEl.text.trim(),
                    language: repoLanguageEl.innerText.trim(),
                })
            })
            .filter((dataOp) => dataOp.isSome)
            .map(dataOp => dataOp.unwrap())
            .toArray()
        )
    }
    catch (err) {
        if (err instanceof Error) {
            return Result.Err(err)
        }

        return Result.Err(new Error(JSON.stringify(err)))
    }
}
