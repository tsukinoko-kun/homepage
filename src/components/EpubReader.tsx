import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type KeyboardEvent,
} from "react";
import { EpubView } from "react-reader";

export interface Props {
    url: string;
}

type TocItem = {
    href: string;
    label: string;
    subitems?: TocItem[];
};

export default function EpubReader(props: Props) {
    const storageKey = `epub:progress:${props.url}`;
    const initial =
        typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;

    const [location, setLocation] = useState<string | null>(initial);
    const [rendition, setRendition] = useState<any>(null);
    const [toc, setToc] = useState<TocItem[]>([]);
    const [currentHref, setCurrentHref] = useState<string | null>(null);
    const [isDark, setIsDark] = useState<boolean>(false);

    const shellRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        shellRef.current?.focus();
    }, []);

    function locationChanged(loc: string) {
        try {
            localStorage.setItem(storageKey, loc);
        } catch (e) {
            console.warn("Could not save progress:", e);
        }
        setLocation(loc);
    }

    // Auto dark mode (UI + EPUB content) with Catppuccin
    useEffect(() => {
        const mql = window.matchMedia("(prefers-color-scheme: dark)");

        const apply = (dark: boolean) => {
            setIsDark(dark);
            if (!rendition) return;

            // Catppuccin Mocha (dark)
            rendition.themes.register("ctp-mocha", {
                body: {
                    background: "#1e1e2e !important", // base
                    color: "#cdd6f4 !important", // text
                },
                "a, a:link, a:visited": {
                    color: "#cba6f7 !important", // mauve
                },
                "::selection": {
                    background: "#585b70 !important", // surface2
                    color: "#cdd6f4 !important",
                },
                "img, image": {
                    filter: "brightness(0.96) contrast(1.04)",
                },
                "pre, code": {
                    background: "#313244 !important", // surface0
                    color: "#cdd6f4 !important",
                },
            });

            // Catppuccin Latte (light)
            rendition.themes.register("ctp-latte", {
                body: {
                    background: "#eff1f5 !important", // base
                    color: "#4c4f69 !important", // text
                },
                "a, a:link, a:visited": {
                    color: "#8839ef !important", // mauve
                },
                "::selection": {
                    background: "#bcc0cc !important", // surface1
                    color: "#4c4f69 !important",
                },
                "img, image": {
                    filter: "none",
                },
                "pre, code": {
                    background: "#ccd0da !important", // surface0
                    color: "#4c4f69 !important",
                },
            });

            rendition.themes.select(dark ? "ctp-mocha" : "ctp-latte");
        };

        apply(mql.matches);
        const onChange = (e: MediaQueryListEvent) => apply(e.matches);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, [rendition]);

    // TOC and current position tracking
    useEffect(() => {
        if (!rendition) return;

        let cancelled = false;
        const book = rendition.book;

        if (book?.loaded?.navigation) {
            book.loaded.navigation.then((nav: any) => {
                if (!cancelled) setToc(nav.toc || []);
            });
        }

        const onRelocated = (loc: any) => {
            const href =
                loc?.start?.href || loc?.end?.href || loc?.href || null;
            setCurrentHref(href);
        };

        rendition.on("relocated", onRelocated);
        return () => {
            cancelled = true;
            rendition.off("relocated", onRelocated);
        };
    }, [rendition]);

    const nextPage = () => rendition?.next();
    const prevPage = () => rendition?.prev();

    const gotoHref = (href: string) => {
        if (rendition) rendition.display(href);
        else setLocation(href);
    };

    const canonical = useCallback(
        (href?: string | null) => {
            if (!href) return href;
            try {
                return rendition?.book?.canonical?.(href) || href;
            } catch {
                return href;
            }
        },
        [rendition],
    );

    const currentCanonical = useMemo(
        () => canonical(currentHref),
        [currentHref, canonical],
    );

    const renderToc = (items: TocItem[]) => {
        return (
            <ul className="m-0 list-none p-0">
                {items.map((item) => {
                    const itemCanonical = canonical(item.href);
                    const active =
                        !!currentCanonical &&
                        (currentCanonical === itemCanonical ||
                            currentCanonical?.endsWith(itemCanonical || ""));

                    return (
                        <li key={item.href} className="my-0.5">
                            <button
                                onClick={() => gotoHref(item.href)}
                                title={item.label}
                                type="button"
                                className={[
                                    "w-full rounded-md px-2 py-1.5 text-left text-sm",
                                    "text-ctp-text",
                                    "hover:bg-ctp-surface-0 hover:text-ctp-mauve",
                                    active
                                        ? "bg-ctp-surface-1 font-semibold text-ctp-mauve"
                                        : "",
                                ].join(" ")}
                            >
                                {item.label}
                            </button>
                            {item.subitems && item.subitems.length > 0 ? (
                                <div className="ml-3 border-l border-ctp-overlay-1 pl-3">
                                    {renderToc(item.subitems)}
                                </div>
                            ) : null}
                        </li>
                    );
                })}
            </ul>
        );
    };

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (!rendition) return;
        if (e.key === "ArrowRight" || e.key === "PageDown") {
            e.preventDefault();
            nextPage();
        } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
            e.preventDefault();
            prevPage();
        }
    };

    return (
        <div
            ref={shellRef}
            className={[
                isDark ? "dark" : "",
                "ctp-latte dark:ctp-mocha",
                "h-dvh w-full overflow-hidden",
                "grid grid-cols-1 xl:[grid-template-columns:280px_1fr]",
                "bg-ctp-base text-ctp-text",
            ].join(" ")}
            onKeyDown={onKeyDown}
        >
            <aside className="hidden border-r border-ctp-overlay-1 xl:block">
                <div className="h-full overflow-auto p-3">
                    {toc.length > 0 ? (
                        renderToc(toc)
                    ) : (
                        <div className="select-none p-2 text-xs text-ctp-subtext0">
                            No TOC available
                        </div>
                    )}
                </div>
            </aside>

            <section
                aria-label="Book"
                className="relative h-full w-full bg-ctp-base"
            >
                <div className="absolute inset-0">
                    <EpubView
                        url={props.url}
                        location={location || null}
                        locationChanged={locationChanged}
                        epubInitOptions={{ openAs: "epub" }}
                        epubOptions={{ allowScriptedContent: true }}
                        getRendition={(rend) => setRendition(rend)}
                    />
                </div>

                <button
                    aria-label="Previous page"
                    onClick={prevPage}
                    type="button"
                    className="absolute inset-y-0 left-0 w-32 min-w-[120px] bg-transparent text-ctp-text opacity-0 transition-opacity duration-250 ease-out md:hover:opacity-100 focus-visible:opacity-100 md:hover:bg-ctp-overlay-1 focus-visible:bg-ctp-overlay-1 flex items-center justify-center touch-manipulation backdrop-blur-sm"
                >
                    <span className="block select-none text-2xl leading-8 rounded-full bg-ctp-mauve text-ctp-base text-center h-8 w-8">
                        &larr;
                    </span>
                </button>

                <button
                    aria-label="Next page"
                    onClick={nextPage}
                    type="button"
                    className="absolute inset-y-0 right-0 w-32 min-w-[120px] bg-transparent text-ctp-text opacity-0 transition-opacity duration-250 ease-out md:hover:opacity-100 focus-visible:opacity-100 md:hover:bg-ctp-overlay-1 focus-visible:bg-ctp-overlay-1 flex items-center justify-center touch-manipulation backdrop-blur-sm"
                >
                    <span className="block select-none text-2xl leading-8 rounded-full bg-ctp-mauve text-ctp-base text-center h-8 w-8">
                        &rarr;
                    </span>
                </button>
            </section>
        </div>
    );
}
