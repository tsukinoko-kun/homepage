import Link from "next/link"
import { XmlTag } from "../components/XmlTag"
import { getPinnedReposAsync, RepoData } from "./lib/pinnedRepos"
import { getOrigin } from "./lib/getOrigin"

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

    return (
        <>
            <br />
            <XmlTag key={project.name} tag="div" id={id}>
                <Link href={"#" + id} className="hidden" scroll={false}>
                    <XmlTag tag="h3">{project.name}</XmlTag>
                </Link>
                <Link href={project.url} target="_blank" rel="noopener noreferrer" className="hidden">
                    <XmlTag tag="script" language="json">
                        {JSON.stringify(project, null, 4)}
                    </XmlTag>
                    <button>Read more</button>
                </Link>
            </XmlTag>
        </>
    )
}

const Page = (props: { projects: RepoData[] }) => (
    <>
        <XmlTag tag="h1">Portfolio</XmlTag>
        {props.projects.map(mapProject)}
    </>
)

export default Page
