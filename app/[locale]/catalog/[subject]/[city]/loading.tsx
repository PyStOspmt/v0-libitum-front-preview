export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-muted" />
        <div className="h-6 w-96 animate-pulse rounded-lg bg-muted" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  )
}
