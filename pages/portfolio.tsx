import Link from "next/link"
import { Fragment } from "react"
import { XmlTag } from "../components/XmlTag"
import { getPinnedReposAsync, RepoData } from "../wrap-api/pinnedRepos"
import { getOrigin } from "../wrap-api/getOrigin"

// eslint-disable-next-line no-restricted-syntax
export const getStaticProps = async () => ({
    props: {
        title: "Portfolio",
        description: "Here are some of my projects",
        projects: await getPinnedReposAsync(getOrigin()),
    },

    // Revalidate every 30 minutes
    revalidate: 30 * 60,
})

const makeId = (name: string) => name
    .toLowerCase()
    .replace(/[()[\]{}]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")

const mapProject = (project: RepoData) => {
    const id = makeId(`project-${project.name}`)
    const cardUrl = new URL("https://github-readme-stats-zeta-bice-58.vercel.app/api/pin")
    cardUrl.searchParams.set("username", project.owner)
    cardUrl.searchParams.set("repo", project.repo)
    cardUrl.searchParams.set("show_owner", "true")
    cardUrl.searchParams.set("theme", "react")
    cardUrl.searchParams.set("hide_border", "true")

    return (
        <Fragment key={id}>
            <br />
            <Link href={project.url} className="hidden" scroll={false} target="_blank" rel="noopener noreferrer">
                <XmlTag tag="img" id={id}>
                    <img src={cardUrl.href} alt={project.name} />
                </XmlTag>
            </Link>
        </Fragment>
    )
}

const Page = (props: { projects: RepoData[] }) => (
    <>
        <XmlTag tag="h1">Portfolio</XmlTag>
        {props.projects.map(mapProject)}
    </>
)

export default Page
