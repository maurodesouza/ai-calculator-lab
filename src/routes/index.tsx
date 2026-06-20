import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="grid min-h-screen place-items-center">
      <p className="text-lg">AI Calculator Lab</p>
    </main>
  )
}
