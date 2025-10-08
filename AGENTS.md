Use PNPM. Use TypeScript. Use Tailwind CSS.

Use the Catppuccin theme plugin for Tailwind CSS `@catppuccin/tailwindcss`. Example:

```html
<body class="bg-ctp-base">
    <h1 class="text-ctp-text">Welcome!</h1>

    <button
        className="bg-linear-50 from-ctp-red-400 to-ctp-mauve-400 text-ctp-base hover:from-ctp-red hover:to-ctp-mauve"
    >
        Click Here
    </button>
</body>
```

I prefer flat colors over gradients.
Never use the default Tailwind CSS color palette. Catppuccin has auto light and dark modes.

Use `??` for nullish checks and `||` for falsy checks. They are not the same!

Use `const` if possible. Use `let` if you need to reassign a variable.

Always run `pnpm run build` before you before you claim to be finished.
