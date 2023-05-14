import withMdx from "@next/mdx"
import rehypePrettyCode from "rehype-pretty-code"
import { getHighlighter } from "shiki"

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs")

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  redirects: async () => [
    {
      source: "/docs",
      destination: "/docs/getting-started",
      permanent: true,
    },
  ],
  experimental: {
    mdxRs: true,
  },
}

/** Originally from `t3-env-docs`
 * @link https://github.com/t3-oss/t3-env/blob/main/docs/next.config.mjs
 */

export default withMdx({
  options: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        // @ts-expect-error - `rehype-pretty-code` is not typed properly
        /** @type {import("rehype-pretty-code").Options} */
        ({
          theme: { dark: "one-dark-pro", light: "github-light" },
          getHighlighter,
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted")
          },
          onVisitHighlightedWord(node, id) {
            node.properties.className = ["word"]
            node.properties["data-word-id"] = id
          },
        }),
      ],
    ],
  },
})(nextConfig)
