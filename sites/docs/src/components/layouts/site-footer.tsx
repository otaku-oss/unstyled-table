import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="w-full bg-background">
      <div className="container flex flex-col items-center justify-center space-y-1 border-t py-5 text-base text-muted-foreground md:h-20 md:py-0">
        <div className="text-center">
          Built by{" "}
          <a
            href={siteConfig.links.twitterOne}
            target="_blank"
            rel="noreferrer"
            className="font-medium hover:underline"
          >
            Touha
            <span className="sr-only">{`Touha's`} twitter</span>
          </a>{" "}
          and{" "}
          <a
            href={siteConfig.links.twitterTwo}
            target="_blank"
            rel="noreferrer"
            className="font-medium hover:underline"
          >
            Sadman
            <span className="sr-only">{`Sadman's`} twitter</span>
          </a>
        </div>
        <div className="text-center">
          Star us on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium hover:underline"
          >
            GitHub
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
