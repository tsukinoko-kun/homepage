import { XmlTag } from "../components/XmlTag"

export const getStaticProps = () => ({
    props: {
        title: "Home",
        description: "Frank Mayer's personal website",
    },
})

const Page = () => (
    <>
        <XmlTag tag="h1">Frank Mayer</XmlTag>
        <XmlTag tag="p">
            <p>I am a Software Engineer located in Heilbronn, Germany.</p>
            <p>Well organised problem solver with high attention to the detail
            and a passion for clean code and good architecture.
            Huge fan of functional programming and a strong believer in the power of the type system.</p>
            <XmlTag tag="br"/>
            <p>In my free time I like to watch anime, play video games and listen to jazz and 80s rock music.</p>
        </XmlTag>
    </>
)

export default Page
