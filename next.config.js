/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
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
