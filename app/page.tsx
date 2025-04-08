import WordBuilderGame from "@/components/word-builder-game"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Animated cyberpunk grid background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,6,6,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,6,6,0.5)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Glowing elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-cyan-500/20 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-purple-500/20 to-transparent"></div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-purple-500/10 blur-3xl"></div>

      <WordBuilderGame />
    </main>
  )
}
