"use client"

/** Originally from `t3-env-docs`
 * @link https://github.com/t3-oss/t3-env/blob/main/docs/src/components/mdx/code-block.tsx
 */
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

type CodeBlockProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
> & {
  /** set by `rehype-pretty-code` */
  "data-language"?: string
  /** set by `rehype-pretty-code` */
  "data-theme"?: string
}

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const language = props["data-language"] as string
  const theme = props["data-theme"] as string
  const Icon = {
    js: Icons.javascript,
    ts: Icons.typescript,
    bash: Icons.bash,
  }[language]

  const preRef = React.useRef<HTMLPreElement>(null)
  const [isCopied, setIsCopied] = React.useState(false)

  return (
    <>
      {Icon && (
        <Icon
          data-language-icon
          data-theme={theme}
          className="absolute left-4 top-4 z-20 h-5 w-5 text-foreground"
        />
      )}
      <Button
        data-theme={theme}
        onClick={() => {
          if (typeof window === "undefined" || !preRef.current) return
          setIsCopied(true)
          void window.navigator.clipboard.writeText(preRef.current.innerText)
          setTimeout(() => setIsCopied(false), 1500)
        }}
        variant="ghost"
        size="sm"
        className="absolute right-0 top-3 w-9 px-0"
      >
        {isCopied ? (
          <Icons.check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Icons.copy className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">
          {isCopied ? "Copied" : "Copy to clipboard"}
        </span>
      </Button>
      <pre
        ref={preRef}
        className="relative my-4 overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-sm font-semibold text-muted-foreground"
        {...props}
      >
        {children}
      </pre>
    </>
  )
}
