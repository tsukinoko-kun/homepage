import { client } from "@frank-mayer/magic"
import styles from "./Wobble.module.scss"

type Props = {
    children: string;
}

const wobbleAnimation = [
    { transform: "scale(1)", transformOrigin: "50% 50%" },
    { transform: "scale(0.7, 0.3)" },
    { transform: "scale(0.975, 0.9)" },
    { transform: "scale(0.875, 0.5)" },
    { transform: "scale(0.9875, 0.95)" },
    { transform: "scale(0.9375, 0.75)" },
    { transform: "scale(1)", transformOrigin: "50% 50%" },
]

export const Wobble = (props: Props) => (
    <>
        {props.children.split("").map((char, index) => (
            char === " "
                ? char
                : <span className={styles.wobble} key={index} onMouseOver={(ev) => {
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
                }}>{char}</span>
        ))}
    </>
)
