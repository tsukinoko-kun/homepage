/* eslint-disable max-len */
import { XmlTag } from "../components/XmlTag"
import ILUImage from "../images/ilu.svg"
import { Wobble } from "../components/Wobble"
import { lazy } from "react"
import type { TagCloudOptions } from "@frank-mayer/react-tag-cloud"

const TagCloud = lazy(() => import("@frank-mayer/react-tag-cloud"))

export const getStaticProps = () => ({
    props: {
        title: "Home",
        description: "Frank Mayer's personal website",
    },
})

const getTagCloudOptions = (w: Window): TagCloudOptions => ({
    radius: Math.min(500, Math.min(w.innerWidth, w.innerHeight) - 32) / 2,
    maxSpeed: "fast",
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
            <XmlTag tag="br" style={{ display: "inline-block", fontSize: "var(--rem)" }} />
            <br />
            <Wobble>{"I'm Frank"}</Wobble>
        </XmlTag>
        <XmlTag tag="p">
            Software Engineer located in Heilbronn, Germany.
            <XmlTag tag="br" />
            Well organised problem solver with high attention to the detail and
            a passion for clean code and good architecture. Huge fan of
            functional programming, criticizer of semicolons and a strong
            believer in the power of the type system.
        </XmlTag>
        <XmlTag tag="p">
            In my free time I like to watch anime, play video games and listen
            to jazz and rock music.
        </XmlTag>
        <XmlTag tag="h2">My tools</XmlTag>
        <XmlTag tag="section">
            <XmlTag tag="h3">Web</XmlTag>
            <TagCloud id="web" options={getTagCloudOptions}>
                {[
                    "VSCode",
                    "TypeScript",
                    "React",
                    "Preact",
                    "Parcel",
                    "Jest",
                    "Next",
                    "ESLint",
                    "Framer Motion",
                    "Three.js",
                ]}
            </TagCloud>
        </XmlTag>
        <XmlTag tag="section">
            <XmlTag tag="h3">Backend</XmlTag>
            <TagCloud id="backend" options={getTagCloudOptions}>
                {[
                    "ReSharper",
                    "Rider",
                    "C#",
                    "F#",
                    "ASP.NET Core",
                    "Nginx",
                    "IntelliJ IDEA",
                    "Kotlin",
                    "Spring",
                    "JUnit",
                ]}
            </TagCloud>
        </XmlTag>
        <XmlTag tag="section">
            <XmlTag tag="h3">Other</XmlTag>
            <TagCloud id="other" options={getTagCloudOptions}>
                {[
                    "Git",
                    "GitHub",
                    "Figma",
                    "Inkscape",
                    "PlantUML",
                    "LaTeX",
                    "Markdown",
                ]}
            </TagCloud>
        </XmlTag>
    </>
)

export default Page
