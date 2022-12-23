import Link from "next/link"
import { XmlTag } from "../components/XmlTag"
import { projects, years } from "../data/projects"
import type { Project } from "../data/projects"

export const getStaticProps = () => ({
    props: {
        title: "Portfolio",
        description: "Here are some of my projects",
    },
})

const makeId = (name: string) => name
    .toLowerCase()
    .replace(/[()[\]{}]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")

const mapProject = (project: Project) => {
    const id = makeId(`project-${project.year}-${project.name}`)

    return (
        <Link key={project.name} href={"#" + id} className="hidden">
            <XmlTag tag="section" id={id}>
                <XmlTag tag="h3">{project.name}</XmlTag>
                <XmlTag tag="script" language="json">
                    {JSON.stringify(project, null, 4)}
                </XmlTag>
            </XmlTag>
        </Link>
    )
}

const Page = () => (
    <>
        {years.map((year) => {
            const id = makeId("projects-year-" + year)
            return (
                <XmlTag key={year} tag="section" id={id}>
                    <Link href={"#" + id} className="hidden">
                        <XmlTag tag="h2">{year}</XmlTag>
                    </Link>
                    {projects
                        .filter((project) => project.year === year)
                        .map(mapProject)}
                </XmlTag>
            )
        })}
    </>
)

export default Page
