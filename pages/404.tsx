import { XmlTag } from "../components/XmlTag"

export const getStaticProps = () => ({
    props: {
        title: "404",
        description: "This page does not exist",
    },
})

const Page = () => (
    <>
        <XmlTag tag="h1">404</XmlTag>
        <XmlTag tag="p">This is not the page you are looking for!</XmlTag>
        <XmlTag tag="p">
            <XmlTag tag="a" href="/" scroll={false}>Maybe try the home page?</XmlTag>
        </XmlTag>
    </>
)

export default Page