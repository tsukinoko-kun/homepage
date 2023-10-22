import "@total-typescript/ts-reset";

export function joinClassNames(
    ...classNames: Array<string | undefined>
): string {
    return classNames
        .filter(Boolean)
        .flatMap((className) => className.split(/\s+/))
        .map((className) => className.trim())
        .filter(Boolean)
        .join(" ");
}
