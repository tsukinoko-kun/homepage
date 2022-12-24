/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev, isServer }) => {
        if (!dev && !isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                "react/jsx-runtime.js": "preact/compat/jsx-runtime",
                react: "preact/compat",
                "react-dom/test-utils": "preact/test-utils",
                "react-dom": "preact/compat",
            }
        }

        config.module.rules.push({
            test: /.+\.(woff|woff2)$/,
            use: {
                loader: "file-loader",
                options: {
                    outputPath: "static/fonts/",
                    publicPath: "/_next/static/fonts/",
                    limit: 1,
                },
            },
        })

        return config
    },
    reactStrictMode: true,
    swcMinify: true,
}

module.exports = nextConfig
