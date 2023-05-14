import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid w-full items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="mx-auto mt-20 flex max-w-md flex-col items-center gap-5">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Unstyled Table
        </h1>
        <p className="text-center text-lg text-muted-foreground sm:text-xl">
          An unstyled react table component built on top of
          @tanstack/react-table v8
        </p>
        <Link href="/docs">
          <div
            className={cn(
              buttonVariants({
                size: "sm",
              })
            )}
          >
            Get Started
            <span className="sr-only">Get started</span>
          </div>
        </Link>
      </div>
    </section>
  )
}
