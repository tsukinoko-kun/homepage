import { initializeApp } from "firebase/app"
import { get, getDatabase, ref } from "firebase/database"
import type { GetStaticProps } from "next/types"

type Props = {
  youtubeLive: string;
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

    const youtubeLiveRef = ref(database, "youtube_live")
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

const Page = (props: Props) => (
    <>
        {props.youtubeLive ? (
            <iframe
                style={{
                    width: "75vmin",
                    height: "50vmin",
                    margin: "2rem auto",
                    display: "block",
                }}
                src={`https://www.youtube-nocookie.com/embed/${props.youtubeLive}`}
                frameBorder={0}
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
            />
        ) : (
            <p style={{ textAlign: "center" }}>
        I&apos;m not live on YouTube right now.
            </p>
        )}
    </>
)

export default Page
