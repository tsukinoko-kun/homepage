import createTagCloud from "TagCloud"
import { useEffect } from "react"

type Props = {
    className: string;
    children: Array<string>;
}

export const TagCloud = (props: Props) => {
    useEffect(() => {
        const key = "tag-cloud-" + props.className

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (key in window && (window as any)[key]) {
            return
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).TagCloud = true

        const container = "." + props.className

        const tagCloud = createTagCloud(
            container,
            props.children,
            {
                radius: Math.min(500, Math.min(window.innerWidth, window.innerHeight) - 32) / 2,
                maxSpeed: "fast"
            }
        )

        return () => {
            try {
                tagCloud?.destroy()
            }
            finally {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (window as any)[key] = false
            }
        }
    })

    return (
        <div className={props.className} />
    )
}

export default TagCloud
