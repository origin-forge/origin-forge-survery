import Header from '@/components/Header'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900">
      <Header />
      <main className="pt-20">
        <Hero />
      </main>
    </div>
  )
}
