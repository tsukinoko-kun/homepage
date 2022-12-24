import { FunctionComponent, ComponentClass, ReactNode, useState, useEffect, createRef, RefObject } from "react"
import { createElement } from "react"
import styles from "./XmlTag.module.scss"
import Link from "next/link"
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism-async"
import syntaxStyle from "react-syntax-highlighter/dist/cjs/styles/prism/darcula"
import { Wobble } from "../Wobble"

type Props = {
    tag: string;
    attributes?: Record<string, unknown>;
    children?: ReactNode;
    classList?: Array<string>;
    role?: string;
    id?: string;
};

type AnchorProps = { tag: "a"; href: string, scroll?: boolean } & Props;

type ScriptProps = { tag: "script"; children: string, language: "tsx" | "jsx" | "json" } & Props;

type LabelProps = { tag: "label"; children: string, for: string } & Props;

type XmlTagProps = Props | AnchorProps | ScriptProps | LabelProps;

const mapAttribute = ([key, value]: [string, unknown], i: number) => {
    let html: {__html: string}|null = null

    const spacer = i !== 0 ? "&thinsp;" : ""

    switch (typeof value) {
    case "boolean":
        if (value) {
            html = {
                __html: spacer + key
            }
        }
        break
    case "number":
        html = {
            __html: spacer + key + "=\"" + value + "\""
        }
        break
    default:
        html = {
            __html: spacer +
            makeStringBreakable(
                key +
                "=" +
                JSON.stringify(value)
            )
        }
        break
    }

    if (html) {
        return (
            <span
                key={key}
                dangerouslySetInnerHTML={html} />
        )
    }

    return null
}

const makeStringBreakable = (str: string) =>
    typeof str === "string"
        ? str.replace(/[^a-zA-Z0-9"'@=_\s]+/g, (x) => x + "&#8203;")
        : str

const directlyUsedTags = new Set(["h1", "h2", "h3", "h4", "h5", "h6", "header", "nav"])
const parentlylyUsedTags: ReadonlyMap<string, FunctionComponent|ComponentClass|string>
    = new Map([["a", (Link as never)]])
const mapTag = (props: XmlTagProps) => {
    const classList = props.classList ?? []
    classList.push(styles["children"])

    if (props.tag === "script") {
        classList.push(styles["script"])
    }

    const attributes: Record<string, string | undefined> = {
        className: classList.join(" "),
        role: props.role,
    }

    if (props.tag === "script" && typeof props.children === "string" && "language" in props) {
        return (
            <SyntaxHighlighter
                {...attributes}
                language={props.language}
                style={syntaxStyle}
                customStyle={{ background: "none", padding: "0", margin: "0 0 0 var(--tab-size)" }}
            >
                {props.children.trim()}
            </SyntaxHighlighter>
        )
    }

    if (typeof props.children === "string") {
        return createElement(
            directlyUsedTags.has(props.tag) ? props.tag : "div",
            {
                ...attributes,
                dangerouslySetInnerHTML: { __html: makeStringBreakable(props.children) },
            }
        )
    }

    return createElement(
        directlyUsedTags.has(props.tag) ? props.tag : "div",
        attributes,
        props.children
    )
}

export const XmlTag = (props: XmlTagProps) => {
    let attr = props.attributes || false

    const isAnchor = props.tag === "a" && "href" in props
    let additionalAttributes: Record<string, string|number|boolean|undefined|RefObject<Element>|object> = {}

    const [box, setBox] = useState<DOMRect>()
    const ref = createRef<HTMLElement>()
    useEffect(() => {
        if (box) {
            return
        }

        const element = ref.current
        if (element) {
            setBox(element.getBoundingClientRect())
        }
    }, [box, ref])

    if ("id" in props) {
        additionalAttributes.id = props.id
        attr = {
            ...attr,
            id: props.id,
        }
    }

    if (isAnchor) {
        const url = new URL((props as AnchorProps).href, "https://www.frank-mayer.io")
        if (attr) {
            attr = { ...props.attributes, href: url.href }
        }
        else {
            attr = { href: url.href }
        }

        if (url.hostname.endsWith("frank-mayer.io")) {
            additionalAttributes.scroll = (props as AnchorProps).scroll
        }
        else {
            attr.target = "_blank"
            additionalAttributes.target = "_blank"
            additionalAttributes.rel = "noopener noreferrer"
        }
    }
    else if (props.tag === "label" && "for" in props) {
        attr = {
            ...attr,
            htmlFor: props.for,
        }

        additionalAttributes = {
            ...additionalAttributes,
            htmlFor: props.for,
        }
    }
    else if (props.tag === "script" && "language" in props) {
        let type = "application/" + props.language
        switch (props.language) {
        case "tsx":
        case "jsx":
            type = "module"
            break
        }

        attr = {
            ...attr,
            type,
        }
    }
    else if (/^h[1-6]$/.test(props.tag) && typeof props.children == "string") {
        props = {
            ...props,
            children: createElement(Wobble, null, props.children)
        }
    }

    additionalAttributes.ref = ref
    additionalAttributes.style = {
        "--box-position": (box ? (box.top + window.scrollY + (box.height / 2)) / screen.height : 0).toString(),
    }

    return props.children ? (
        createElement(
            (parentlylyUsedTags.has(props.tag) ? parentlylyUsedTags.get(props.tag) : "span") as string,
            isAnchor
                ? { ...additionalAttributes, className: styles["xml-tag"] + " " + styles[props.tag], href: (props as AnchorProps).href }
                : { ...additionalAttributes, className: styles["xml-tag"] + " " + styles[props.tag] },
            <span className={styles["opening"]} role="presentation" aria-hidden>
                {attr ? (
                    <>
                        <span>{`<${props.tag}`}&ensp;</span>
                        {Object.entries(attr).map(mapAttribute)}
                        <span>&#8203;&gt;</span>
                    </>
                ) : (
                    <span>{`<${props.tag}>`}</span>
                )}
            </span>,
            mapTag(props),
            <span className={styles["closing"]} role="presentation" aria-hidden>
                <span>&lt;/</span>
                <span>{props.tag}</span>
                <span>&gt;</span>
            </span>
        )
    ) : (
        createElement(
            (isAnchor ? Link : "span") as string,
            isAnchor
                ? { ...additionalAttributes, className: styles["xml-tag"] + " " + styles[props.tag], href: (props as AnchorProps).href, role: "presentation", "aria-hidden": true }
                : { ...additionalAttributes, className: styles["xml-tag"] + " " + styles[props.tag] },
            <span className={styles["opening"]}>
                <span>&lt;{props.tag}&ensp;</span>
                {props.attributes
                    ? Object.entries(props.attributes).map(mapAttribute)
                    : null}
                <span>/&gt;</span>
            </span>
        )
    )
}
