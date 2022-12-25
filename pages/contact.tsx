import { useRouter } from "next/router"
import { XmlTag } from "../components/XmlTag"
import type { GetServerSidePropsContext } from "next/types"

export const getStaticProps = () => ({
    props: {
        title: "Contact",
        description: "Contact me to get more information",
    },
})

export const getServerSideProps = ({ res }: GetServerSidePropsContext) => {
    res.setHeader(
        "Cache-Control",
        "public, max-age=3600, stale-while-revalidate=86400"
    )

    return {
        props: {},
    }
}

const Page = () => {
    const router = useRouter()

    return (
        <>
            <XmlTag tag="h1">Contact</XmlTag>
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
                        <XmlTag tag="input" attributes={{ type: "submit", value: "Absenden" }}>
                            <input type="submit" value="Absenden" />
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
