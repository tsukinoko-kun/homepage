/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        colors: {
            background: "rgb(var(--color-background) / <alpha-value>)",
            foreground: "rgb(var(--color-foreground) / <alpha-value>)",
            primary: "rgb(var(--color-primary) / <alpha-value>)",
            secondary: "rgb(var(--color-secondary) / <alpha-value>)",
            inactive: "rgb(var(--color-inactive) / <alpha-value>)",
            disabled: "rgb(var(--color-disabled) / <alpha-value>)",
            selection: "rgb(var(--color-selection) / <alpha-value>)",
        },
    },
    plugins: [],
};
