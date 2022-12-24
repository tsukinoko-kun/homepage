/* eslint-disable max-len */
import { XmlTag } from "../components/XmlTag"
import WavingHand from "../images/waving-hand.gif"
import { Wobble } from "../components/Wobble"
import { lazy } from "react"

const TagCloud = lazy(() => import("../components/TagCloud"))
const Image = lazy(() => import("next/image"))

export const getStaticProps = () => ({
    props: {
        title: "Home",
        description: "Frank Mayer's personal website",
    },
})

const Page = () => (
    <>
        <XmlTag tag="h1">
            <Wobble>Hey,</Wobble> <Image src={WavingHand} alt="" placeholder="empty" loading="lazy" decoding="async" width={512} height={512} style={{ height:"1em", width: "1em" }} />
            <br/>
            <Wobble>{"I'm Frank"}</Wobble>
        </XmlTag>
        <XmlTag tag="p">
            Software Engineer located in Heilbronn, Germany.
            <XmlTag tag="br"/>
            Well organised problem solver with high attention to the detail
            and a passion for clean code and good architecture.
            Huge fan of functional programming, criticizer of semicolons and a strong believer in the power of the type system.
        </XmlTag>
        <XmlTag tag="p">
            In my free time I like to watch anime, play video games and listen to jazz and rock music.
        </XmlTag>
        <XmlTag tag="h2">My tools</XmlTag>
        <XmlTag tag="section">
            <XmlTag tag="h3">Web</XmlTag>
            <TagCloud className="web">{["VSCode", "TypeScript", "React", "Preact", "Jest", "Next", "ESLint", "Framer Motion", "Three.js"]}</TagCloud>
        </XmlTag>
        <XmlTag tag="section">
            <XmlTag tag="h3">Backend</XmlTag>
            <TagCloud className="backend">{["ReSharper", "Rider", "C#", "F#", "ASP.NET Core", "Kotlin", "Spring", "JUnit"]}</TagCloud>
        </XmlTag>
        <XmlTag tag="section">
            <XmlTag tag="h3">Other</XmlTag>
            <TagCloud className="other">{["Git", "GitHub", "Figma", "Inkscape", "PlantUML", "LaTeX", "Markdown"]}</TagCloud>
        </XmlTag>
    </>
)

export default Page
