import { useRouter } from "next/router"
import { XmlTag } from "./XmlTag"

const data = [
    {
        href: "/",
        text: "Home",
    },
    {
        href: "/portfolio",
        text: "Portfolio",
    },
    {
        href: "/contact",
        text: "Contact",
    },
    {
        href: "/live",
        text: "YouTube Stream",
    }
]

export const Header = () => {
    const router = useRouter()

    return (
        <header>
            <XmlTag tag="nav" role="header">
                {data.map(({ href, text }) => {
                    if (router.pathname === href) {
                        return (
                            <XmlTag key={text} scroll={false} classList={["current"]} tag="a" href={href}>{text}</XmlTag>
                        )
                    }

                    return (
                        <XmlTag key={text} scroll={false} tag="a" href={href}>{text}</XmlTag>
                    )
                })}
            </XmlTag>
        </header>
    )
}
