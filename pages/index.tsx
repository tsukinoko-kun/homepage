/* eslint-disable max-len */
import { XmlTag } from "../components/XmlTag"

export const getStaticProps = () => ({
    props: {
        title: "Home",
        description: "Frank Mayer's personal website",
    },
})

const Page = () => (
    <>
        <XmlTag tag="h1">Hey, &#x1F44B;<br/>I&apos;m Frank</XmlTag>
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
    </>
)

export default Page
