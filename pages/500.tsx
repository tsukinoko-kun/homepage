import { XmlTag } from "../components/XmlTag"

export const getStaticProps = () => ({
    props: {
        title: "500",
        description: "Server-side error occurred",
    },
})

const Page = () => (
    <>
        <XmlTag tag="h1">500</XmlTag>
        <XmlTag tag="p">Server-side error occurred</XmlTag>
        <XmlTag tag="p">
            <XmlTag tag="a" href="/" scroll={false}>Try to sneak to the main page without anyone noticing!</XmlTag>
        </XmlTag>
    </>
)

export default Page
