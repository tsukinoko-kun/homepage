import { initializeApp } from "firebase/app"
import { get, getDatabase, ref } from "firebase/database"
import type { GetStaticProps } from "next/types"
import { XmlTag } from "../components/XmlTag"

type Props = {
  youtubeLive: {
    isRecording: boolean;
    id: string;
  };
};

// eslint-disable-next-line no-restricted-syntax
export const getStaticProps: GetStaticProps<Props> = async () => {
    const app = initializeApp({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
    })

    const database = getDatabase(app)

    const youtubeLiveRef = ref(database, "youtubeLive")
    const youtubeLiveSnapshot = await get(youtubeLiveRef)
    const youtubeLiveValue = youtubeLiveSnapshot.val()

    return {
        props: {
            youtubeLive: youtubeLiveValue,
            title: "Live",
            description: "Watch me live on YouTube",
        },
        revalidate: 120,
    }
}

const Page = (props: Props) => {
    if (props.youtubeLive && props.youtubeLive.id) {
        const url = new URL("https://www.youtube-nocookie.com/embed/" + (props.youtubeLive?.id ?? ""))
        if (!props.youtubeLive.isRecording) {
            url.searchParams.set("controls", "0")
        }
        url.searchParams.set("autoplay", "1")

        return (
            <>
                <XmlTag tag="h1">Live on YouTube</XmlTag>

                <XmlTag tag="iframe" attributes={{
                    src: url.href,
                    allow: "encrypted-media; picture-in-picture",
                    allowFullScreen: true
                }}>
                    <iframe
                        style={{
                            width: "75vmin",
                            height: "50vmin",
                            margin: "2rem auto",
                            display: "block",
                        }}
                        src={url.href}
                        frameBorder={0}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen />
                </XmlTag>
                {props.youtubeLive.isRecording ? <XmlTag tag="p">This video is a recording of the last stream</XmlTag> : null}
            </>
        )
    }

    return <>
        <XmlTag tag="h1">Live on YouTube</XmlTag>
        <XmlTag tag="p">There is no live stream avaliable</XmlTag>
    </>
}

export default Page
