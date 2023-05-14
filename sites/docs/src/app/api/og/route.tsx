import type { ServerRuntime } from "next"
import { ImageResponse } from "@vercel/og"
import * as z from "zod"

const ogImageSchema = z.object({
  title: z.string(),
  description: z.string(),
  theme: z.enum(["light", "dark"]).default("dark"),
})

export const runtime: ServerRuntime = "edge"

export function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const parsedValues = ogImageSchema.parse(
      Object.fromEntries(url.searchParams)
    )

    const { theme, title, description } = parsedValues
    const paint = theme === "dark" ? "#fff" : "#000"

    return new ImageResponse(
      (
        <div
          tw="h-full w-full flex items-center justify-center flex-col"
          style={{
            color: paint,
            background:
              theme === "dark"
                ? "linear-gradient(90deg, #000 0%, #111 100%)"
                : "white",
          }}
        >
          <div tw="flex items-center text-3xl justify-center flex-col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="124"
              height="124"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
              <line x1="3" x2="21" y1="9" y2="9"></line>
              <line x1="3" x2="21" y1="15" y2="15"></line>
              <line x1="12" x2="12" y1="3" y2="21"></line>
            </svg>
          </div>
          <div
            tw="flex max-w-3xl items-center justify-center flex-col mt-10"
            style={{
              whiteSpace: "pre-wrap",
            }}
          >
            <div tw="text-5xl font-bold tracking-tight leading-tight dark:text-white px-8">
              {title}
            </div>
            <div tw="mt-5 text-3xl text-slate-400 text-center font-normal tracking-tight leading-tight px-20">
              {description}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    error instanceof Error
      ? console.log(`${error.message}`)
      : console.log(error)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
