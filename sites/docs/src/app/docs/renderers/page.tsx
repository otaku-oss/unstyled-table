import { Header } from "@/components/header"

export default function RenderersPage() {
  return (
    <section className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <Header
        title="Renderers"
        description="Renderers are the building blocks of your table. They are responsible for rendering the table, rows, cells, and headers."
      />
    </section>
  )
}
