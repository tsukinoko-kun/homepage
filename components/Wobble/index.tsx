import { client } from "@frank-mayer/magic"
import styles from "./Wobble.module.scss"

type Props = {
    children: string;
}

const getWobbleAnimation = (char: string) => {
    const charIsTall = isTall(char)

    return [
        { transform: "scale(1)", transformOrigin: charIsTall ? "50% 50%" : "50% 60%" },
        { transform: "scale(0.7, 0.1)" },
        { transform: "scale(0.975, 0.9)" },
        { transform: "scale(0.875, 0.4)" },
        { transform: "scale(0.9875, 0.95)" },
        { transform: "scale(0.9375, 0.5)" },
        { transform: "scale(1)", transformOrigin: charIsTall ? "50% 50%" : "50% 60%" },
    ]
}

const isTall = (char: string) => /^[A-Z0-9ltfi]$/.test(char)

export const Wobble = (props: Props) => (
    <>
        {props.children.split("").map((char, index) => {
            if (char == " ") {
                return " "
            }

            const wobbleAnimation = getWobbleAnimation(char)

            return <span className={styles.wobble} key={index} onMouseOver={(ev) => {
                if (client.isTouchDevice) {
                    return
                }

                const target = ev.target as HTMLElement

                if (target.getAnimations().length != 0) {
                    return
                }

                target.animate(wobbleAnimation, {
                    duration: 750,
                })
            } }>{char}</span>
        })}
    </>
)
