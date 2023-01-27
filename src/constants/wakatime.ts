const wakatimeUrl = "https://github-readme-stats-zeta-bice-58.vercel.app/api/wakatime?" +
([
["custom_title", "Most Used Languages Last Week"],
["username", "tsukinoko"],
["hide", "Other,JSON,INI,netrw,Markdown,Vim Script,Git Config,textmate,Text,Bash,YAML,XML"],
["theme", "radical"],
["layout", "compact"],
["hide_border", "true"],
["title_color", "aa51f8"],
["bg_color", "13161c"],
["text_color", "d0d0d0"],
] as Array<[string, string]>)
.map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&")

export const WAKATIME_WIDGET_URL = wakatimeUrl
