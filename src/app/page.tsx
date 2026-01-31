export default function Home() {
  return (
    <main className="max-w-2xl mx-auto">
      <div className="paper rounded-xl p-6 sm:p-8">
        <h1 className="font-title text-4xl font-bold mb-4">Literature blog</h1>
        <div className="rule my-6" role="presentation" />
        <p className="text-lg leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
          Welcome. Use the sidebar to read about me or browse essays.
        </p>
      </div>
    </main>
  )
}
