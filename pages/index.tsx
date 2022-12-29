/* eslint-disable max-len */
import { XmlTag } from "../components/XmlTag"
import ILUImage from "../images/ilu.svg"
import { Wobble } from "../components/Wobble"
import { lazy } from "react"
import type { TagCloudOptions } from "@frank-mayer/react-tag-cloud"
import Link from "next/link"

const TagCloud = lazy(() => import("@frank-mayer/react-tag-cloud"))

export const getStaticProps = () => ({
    props: {
        title: "Home",
        description: "Frank Mayer's personal website",
    },
})

const Page = () => (
    <>
        <XmlTag tag="h1">
            <Wobble>Hey,</Wobble>&thinsp;
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={ILUImage.src}
                alt=""
                loading="lazy"
                decoding="async"
                style={{ height: "1em", width: "1em", display: "inline" }}
            />
            <XmlTag
                tag="br"
                style={{ display: "inline-block", fontSize: "var(--rem)" }}
            />
            <br />
            <Wobble>{"I'm Frank"}</Wobble>
        </XmlTag>

        <XmlTag tag="section" id="intro">
            <XmlTag tag="p">
                Software Engineer located in Heilbronn, Germany.
                <XmlTag tag="br" />
                Well organised problem solver with high attention to the detail and
                a passion for clean code and good architecture. Huge fan of
                functional programming, criticizer of semicolons and a strong
                believer in the power of the type system.
                <XmlTag tag="br"/>
                In my free time I like to watch anime, play video games and listen
                to jazz and rock music.
            </XmlTag>
            <br />
            <XmlTag tag="p">
                Interested in working together?{" "}<Link href="contact">Contact me</Link>
                <XmlTag tag="br"/>
                Still not sure? Take a look at{" "}<Link href="portfolio">my work</Link>
            </XmlTag>
        </XmlTag>

        <XmlTag tag="section" id="tools-i-use">
            <Link href="#tools-i-use" className="hidden" scroll={false}>
                <XmlTag tag="h2" inline>Tools I use</XmlTag>
            </Link>
            <br /><br />
            <XmlTag tag="h3" inline>Web</XmlTag>
            <TagCloudFromData>{web}</TagCloudFromData>
            <br /><br />
            <XmlTag tag="h3" inline>Backend</XmlTag>
            <TagCloudFromData>{backend}</TagCloudFromData>
            <br /><br />
            <XmlTag tag="h3" inline>Other</XmlTag>
            <TagCloudFromData>{other}</TagCloudFromData>
        </XmlTag>
    </>
)

export default Page

const getTagCloudOptions = (w: Window): TagCloudOptions => ({
    radius: Math.min(500, Math.min(w.innerWidth, w.innerHeight) - 32) / 2,
    maxSpeed: "normal"
})

const TagCloudFromData = (props: {children: Array<{text: string, href: string}>}) => (
    <TagCloud options={getTagCloudOptions} onClick={(tag) => {
        const link = props.children.find(x => x.text === tag)

        // eslint-disable-next-line no-alert
        if (link && window.confirm(`Do you want to open the website of ${tag}?`)) {
            const w = window.open(link.href, "_blank")
            if (w) {
                w.focus()
            }
        }
    }}>
        {props.children.map(x => x.text)}
    </TagCloud>
)

const web = [
    {
        text: "VSCode",
        href: "https://code.visualstudio.com",
    },
    {
        text: "TypeScript",
        href: "https://www.typescriptlang.org",
    },
    {
        text: "React",
        href: "https://reactjs.org",
    },
    {
        text: "Preact",
        href: "https://preactjs.com",
    },
    {
        text: "Parcel",
        href: "https://parceljs.org",
    },
    {
        text: "Jest",
        href: "https://jestjs.io",
    },
    {
        text: "Next",
        href: "https://nextjs.org",
    },
    {
        text: "ESLint",
        href: "https://eslint.org",
    },
    {
        text: "Framer Motion",
        href: "https://www.framer.com/motion",
    },
    {
        text: "Three.js",
        href: "https://threejs.org",
    },
]

const backend = [
    {
        text: "ReSharper",
        href: "https://www.jetbrains.com/resharper",
    },
    {
        text: "Visual Studio",
        href: "https://visualstudio.microsoft.com",
    },
    {
        text: "Rider",
        href: "https://www.jetbrains.com/rider",
    },
    {
        text: "C#",
        href: "https://docs.microsoft.com/en-us/dotnet/csharp",
    },
    {
        text: "F#",
        href: "https://fsharp.org",
    },
    {
        text: "ASP.NET Core",
        href: "https://docs.microsoft.com/en-us/aspnet/core",
    },
    {
        text: "Nginx",
        href: "https://www.nginx.com",
    },
    {
        text: "IntelliJ IDEA",
        href: "https://www.jetbrains.com/idea",
    },
    {
        text: "Kotlin",
        href: "https://kotlinlang.org",
    },
    {
        text: "Spring",
        href: "https://spring.io",
    },
    {
        text: "JUnit",
        href: "https://junit.org",
    },
    {
        text: "Docker",
        href: "https://www.docker.com",
    },
    {
        text: "MariaDB",
        href: "https://mariadb.org",
    },
]

const other =  [
    {
        text: "Git",
        href: "https://git-scm.com",
    },
    {
        text: "GitHub",
        href: "https://github.com",
    },
    {
        text: "Figma",
        href: "https://www.figma.com",
    },
    {
        text: "Unreal Engine",
        href: "https://www.unrealengine.com",
    },
    {
        text: "Inkscape",
        href: "https://inkscape.org",
    },
    {
        text: "PlantUML",
        href: "https://plantuml.com",
    },
    {
        text: "LaTeX",
        href: "https://www.latex-project.org",
    },
    {
        text: "Markdown",
        href: "https://daringfireball.net/projects/markdown",
    },
]
