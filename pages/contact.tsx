import { useRouter } from "next/router"
import { XmlTag } from "../components/XmlTag"

export const getStaticProps = () => ({
    props: {
        title: "Contact",
        description: "Contact me to get more information",
    },
})

const Page = () => {
    const router = useRouter()

    return (
        <>
            <XmlTag tag="h1" inline>Contact</XmlTag>

            <br />
            <br />

            <XmlTag tag="h2" inline>Social Media</XmlTag>
            <XmlTag rel="me" tag="a" href="https://hello.2heng.xin/@tsukinoko" attributes={{
                href: "https://littlefo.rest/@tsukinoko",
            }}>Mastodon</XmlTag>
            <XmlTag tag="a" href="https://twitter.com/FF1493FF">Twitter</XmlTag>

            <br />

            <XmlTag tag="h2" inline>Form</XmlTag>

            <br />
            <XmlTag tag="form" attributes={{ action:"https://eo4hr3kdzumsq1q.m.pipedream.net", method:"post" }}>
                <form action="https://eo4hr3kdzumsq1q.m.pipedream.net" method="post">
                    <label>
                        <XmlTag tag="label" for="email">
                        E-Mail
                            <XmlTag tag="input" attributes={{
                                placeholder: "your@email.com",
                                name: "mail",
                                type: "email",
                                autoComplete: "email",
                                required: true,
                            }}>
                                <input
                                    placeholder="your@email.com"
                                    name="mail"
                                    type="email"
                                    autoComplete="email"
                                    required
                                />
                            </XmlTag>
                        </XmlTag>
                    </label>

                    <label>
                        <XmlTag tag="label" for="message">
                        Message (max. 512 characters)
                            <XmlTag tag="textarea" attributes={{
                                placeholder: "Your message...",
                                name: "message",
                                minLength: 10,
                                maxLength: 512,
                                required: true,
                            }}>
                                <textarea
                                    placeholder="Your message..."
                                    name="message"
                                    minLength={10}
                                    maxLength={512}
                                    required
                                />
                            </XmlTag>
                        </XmlTag>
                    </label>

                    <label>
                        <XmlTag tag="input" attributes={{ type: "submit", value: "Send" }}>
                            <input type="submit" value="Send" />
                        </XmlTag>
                    </label>
                    <input
                        type="hidden"
                        name="from"
                        value={"https://www.frank-mayer.io" + router.pathname}
                    />
                </form>
            </XmlTag>
        </>
    )
}

Page.displayName = "Contact"

export default Page
