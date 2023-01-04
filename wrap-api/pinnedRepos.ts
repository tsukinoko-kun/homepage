import type { RepoData } from "../pages/api/pinned-repos"
export type { RepoData } from "../pages/api/pinned-repos"

export const getPinnedReposAsync = async (origin: string): Promise<Array<RepoData>> => {
    try {
        const url = new URL("/api/pinned-repos", origin)
        return await(await fetch(url)).json()
    }
    catch (error) {
        return []
    }
}
