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

    return (
        <Fragment key={id}>
            <br />
            <XmlTag key={project.name} tag="div" id={id}>
                <Link href={"#" + id} className="hidden" scroll={false}>
                    <XmlTag tag="h3">{project.name}</XmlTag>
                </Link>
                <XmlTag tag="p" inline>{project.description}</XmlTag>
                <XmlTag tag="p" inline>Lnguage: {project.language}</XmlTag>
                <Link href={project.url} target="_blank" rel="noopener noreferrer" className="hidden">
                    <XmlTag tag="button" inline>
                        <button>Read more</button>
                    </XmlTag>
                </Link>
            </XmlTag>
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
