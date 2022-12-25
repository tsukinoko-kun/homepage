import { XmlTag } from "./XmlTag"

export const Header = () => (
    <header>
        <XmlTag tag="nav" role="header">
            <XmlTag scroll={false} tag="a" href="/">Home</XmlTag>
            <XmlTag scroll={false} tag="a" href="/portfolio">Portfolio</XmlTag>
            <XmlTag scroll={false} tag="a" href="/contact">Contact</XmlTag>
            <XmlTag scroll={false} tag="a" href="/live">Live (YouTube)</XmlTag>
        </XmlTag>
    </header>
)
