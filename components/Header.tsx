import { XmlTag } from "./XmlTag"

export const Header = () => (
    <XmlTag tag="header" role="header">
        <XmlTag tag="nav" role="header">
            <XmlTag tag="a" href="/">Home</XmlTag>
            <XmlTag tag="a" href="/portfolio">Portfolio</XmlTag>
            <XmlTag tag="a" href="/contact">Contact</XmlTag>
        </XmlTag>
    </XmlTag>
)
