import { extname } from "@frank-mayer/magic/Path"

type Font = {
    name: string;
    url: string;
};

type Props = {
    fonts: Array<Font>;
};

export const PreLoadFonts = (props: Props) => (
    <>
        {props.fonts.map((font) => (
            <PreLoadFont key={font.name} {...font} />
        ))}
    </>
)

export const PreLoadFont = (props: Font) => {
    const type = "font/" + extname(props.url).substring(1)

    return (
        <link rel="preload" href={props.url} as="font" type={type} />
    )
}

const getFontFormat = (url: string) => {
    let format = extname(url).substring(1)
    switch (format) {
    case "ttf":
        format = "truetype"
        break
    }

    return format
}

export const LoadFonts = (props: Props) => (
    <>
        {props.fonts.map((font) => (
            <LoadFont key={font.name} {...font} />
        ))}
    </>
)

export const LoadFont = (props: Font) => (
    <style jsx global>
        {`
            @font-face {
                font-family: "${props.name}";
                src: url("${props.url}") format("${getFontFormat(props.url)}");
                display: block;
                font-display: block;
            }
        `}
    </style>
)
