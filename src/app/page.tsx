export default function Home() {
  return (
    <main className="max-w-2xl mx-auto">
      <div className="paper rounded-xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="inline-block mb-4 text-6xl leading-none" style={{ color: "var(--accent)", opacity: 0.3 }}>
            "
          </div>
          <h1 className="font-title text-4xl font-bold mb-2">Literature blog</h1>
          <div className="rule my-6 max-w-xs mx-auto" role="presentation" />
        </div>
        
        <div className="space-y-4 text-center">
          <p className="text-xl font-medium leading-relaxed" style={{ color: "var(--foreground)" }}>
            Welcome to my blog!
          </p>
          <p className="text-lg leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
            Here you'll find my essays and insights drawn from books I've read.
          </p>
          <p className="text-lg leading-relaxed italic" style={{ color: "var(--foreground-muted)" }}>
            Enjoy your reading!
          </p>
        </div>

        <div className="mt-10 pt-6 flex justify-center">
          <div className="w-24 h-24 opacity-40" style={{ color: "var(--accent)" }}>
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 15 L20 85 L50 75 L80 85 L80 15 L50 20 Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 15 L50 20 L80 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="50"
                y1="20"
                x2="50"
                y2="75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </main>
  )
}
