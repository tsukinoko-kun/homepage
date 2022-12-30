import { client } from "@frank-mayer/magic"
import styles from "./Wobble.module.scss"
import { Fragment } from "react"
import type { CSSProperties } from "react"

type Props = {
    children: string;
    style?: CSSProperties;
}

const getWobbleAnimation = (char: string) => {
    const charIsTall = isTall(char)

    return [
        { transform: "scale(1)", transformOrigin: charIsTall ? "50% 50%" : "50% 60%" },
        { transform: "scale(1.4, 0.1)" },
        { transform: "scale(0.9, 0.9)" },
        { transform: "scale(1.2, 0.4)" },
        { transform: "scale(0.95, 0.95)" },
        { transform: "scale(1.1, 0.5)" },
        { transform: "scale(1)", transformOrigin: charIsTall ? "50% 50%" : "50% 60%" },
    ]
}

const isTall = (char: string) => /^[A-Z0-9ltfi'"]$/.test(char)

export const Wobble = (props: Props) => (
    <>
        {props.children.split("").map((char, index) => {
            if (/^\s$/.test(char)) {
                if (props.style) {
                    return <span style={props.style} key={index}>&ensp;<wbr/></span>
                }

                return <Fragment key={index}>&ensp;<wbr/></Fragment>
            }

            const wobbleAnimation = getWobbleAnimation(char)

            return <span style={props.style} className={styles.wobble} key={index} onMouseMove={(ev) => {
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
