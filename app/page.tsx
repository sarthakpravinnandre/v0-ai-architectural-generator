'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, BarChart3, Box, Building2, Check, ChevronRight, Layers3, Menu, MessageSquare, ScanLine, ShieldCheck, Sparkles, X, Zap } from 'lucide-react'

const heroImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-08-30%20002947-h42m9BJdOlHrHGubjrPvCbjZyFIGLz.png'
const explodedImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-08-30%20003005-7p0Y8K2WdPQ1z898a63lmOuxT3jOFG.png'
const assistantImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-08-30%20003052-fzD6KFB9Ub26zsuQGM3lUVhd9kOgDA.png'

const features = [
  { icon: ScanLine, label: 'Smart concept generation', text: 'Turn site constraints into clear, buildable concepts with less iteration.' },
  { icon: Layers3, label: 'Digital twin workspace', text: 'Move from floor plans to coordinated building views in one connected canvas.' },
  { icon: ShieldCheck, label: 'Code-aware analysis', text: 'Surface setbacks, circulation, structure, and safety considerations early.' },
  { icon: BarChart3, label: 'Project intelligence', text: 'Understand area, cost, energy, and material decisions at a glance.' },
]

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-[#080d18] text-[#eef6ff] selection:bg-[#28b8ff]/30">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#080d18]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Clarivo home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#42c5ff]/40 bg-[#10263e] text-[#42c5ff]"><Building2 size={19} /></span>
            <span className="text-lg font-semibold tracking-[0.22em] text-white">CLARIVO</span>
          </Link>
          <div className="hidden items-center gap-8 text-sm text-[#9eafc3] md:flex">
            <Link href="#platform" className="transition-colors hover:text-white">Platform</Link>
            <Link href="#workflow" className="transition-colors hover:text-white">Workflow</Link>
            <Link href="#intelligence" className="transition-colors hover:text-white">Intelligence</Link>
            <Link href="/generator" className="transition-colors hover:text-white">Workspace</Link>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <Link href="/ai-demo" className="text-sm text-[#b5c5d6] hover:text-white">View demo</Link>
            <Link href="/generator"><Button className="h-10 rounded-lg bg-[#2bbcff] px-5 text-sm font-semibold text-[#06101d] hover:bg-[#76d5ff]">Launch workspace <ArrowUpRight size={16} /></Button></Link>
          </div>
          <button className="rounded-lg border border-white/10 p-2 md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {mobileOpen && <div className="border-t border-white/10 bg-[#0b1220] px-5 py-5 md:hidden"><div className="flex flex-col gap-5 text-sm text-[#b5c5d6]"><Link href="#platform" onClick={() => setMobileOpen(false)}>Platform</Link><Link href="#workflow" onClick={() => setMobileOpen(false)}>Workflow</Link><Link href="#intelligence" onClick={() => setMobileOpen(false)}>Intelligence</Link><Link href="/generator">Launch workspace</Link></div></div>}
      </nav>

      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-36 lg:px-8 lg:pb-28 lg:pt-48">
        <div className="pointer-events-none absolute inset-x-0 top-20 h-[620px] bg-[radial-gradient(ellipse_at_60%_0%,rgba(31,128,205,0.22),transparent_58%)]" />
        <div className="relative grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <div className="mb-7 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-[#42c5ff]"><span className="h-px w-8 bg-[#42c5ff]" />AI architecture intelligence</div>
            <h1 className="max-w-2xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl lg:text-[78px]">Design with clarity.<br /><span className="text-[#42c5ff]">Build with confidence.</span></h1>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-8 text-[#9eafc3]">Clarivo connects generative design, structural thinking, and project intelligence in one precise workspace for the built environment.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row"><Link href="/generator"><Button className="h-12 rounded-lg bg-[#2bbcff] px-6 font-semibold text-[#06101d] hover:bg-[#76d5ff]">Start a project <ArrowUpRight size={17} /></Button></Link><Link href="#platform"><Button variant="outline" className="h-12 rounded-lg border-white/15 bg-white/[0.03] px-6 text-white hover:bg-white/10">Explore platform <ChevronRight size={17} /></Button></Link></div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-xs text-[#71859d]"><span className="flex items-center gap-2"><Check size={14} className="text-[#42c5ff]" /> Concept to construction</span><span className="flex items-center gap-2"><Check size={14} className="text-[#42c5ff]" /> BIM-ready thinking</span><span className="flex items-center gap-2"><Check size={14} className="text-[#42c5ff]" /> Built for teams</span></div>
          </div>
          <div className="relative lg:translate-y-4"><div className="absolute -inset-5 rounded-3xl bg-[#168dcc]/20 blur-3xl" /><div className="relative overflow-hidden rounded-2xl border border-[#6bcfff]/25 bg-[#111c2b] p-2 shadow-2xl shadow-[#0075b4]/20"><div className="mb-2 flex items-center justify-between px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#7890a8]"><span>Project / Northline Commons</span><span className="flex items-center gap-2 text-[#42c5ff]"><span className="h-1.5 w-1.5 rounded-full bg-[#42c5ff]" /> Live model</span></div><img src={heroImage} alt="Contemporary commercial building visualization" className="h-[300px] w-full rounded-xl object-cover sm:h-[410px]" /><div className="grid grid-cols-3 gap-2 p-2"><div className="rounded-lg bg-white/[0.05] p-3"><p className="text-[10px] text-[#71859d]">Buildable area</p><p className="mt-1 text-lg font-semibold">2,198 <span className="text-xs font-normal text-[#71859d]">m²</span></p></div><div className="rounded-lg bg-white/[0.05] p-3"><p className="text-[10px] text-[#71859d]">Design score</p><p className="mt-1 text-lg font-semibold text-[#42c5ff]">94.2</p></div><div className="rounded-lg bg-white/[0.05] p-3"><p className="text-[10px] text-[#71859d]">Iterations</p><p className="mt-1 text-lg font-semibold">06</p></div></div></div></div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#0b1422]" id="platform"><div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/[0.08] px-5 py-7 lg:grid-cols-4 lg:px-8">{[['01', 'One connected model'], ['04×', 'Design intelligence layers'], ['60%', 'Less design iteration'], ['24/7', 'Project visibility']].map(([value, label]) => <div key={label} className="px-4 first:pl-0 last:pr-0 lg:px-8"><p className="text-2xl font-semibold text-white">{value}</p><p className="mt-1 text-xs uppercase tracking-[0.13em] text-[#71859d]">{label}</p></div>)}</div></section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><p className="text-xs font-medium uppercase tracking-[0.24em] text-[#42c5ff]">One platform, every layer</p><h2 className="mt-5 max-w-lg text-4xl font-semibold leading-tight tracking-[-0.04em] text-white lg:text-5xl">From the first line to the final detail.</h2></div><p className="max-w-xl text-base leading-7 text-[#8fa3b8]">Clarivo gives architects, engineers, and builders a shared visual language for making better decisions earlier.</p></div><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{features.map(({ icon: Icon, label, text }) => <article key={label} className="group rounded-xl border border-white/10 bg-white/[0.025] p-6 transition-all hover:-translate-y-1 hover:border-[#42c5ff]/50 hover:bg-[#10243a]"><Icon className="text-[#42c5ff]" size={22} /><h3 className="mt-12 text-lg font-medium text-white">{label}</h3><p className="mt-3 text-sm leading-6 text-[#8195aa]">{text}</p><div className="mt-7 h-px w-8 bg-[#42c5ff] transition-all group-hover:w-full" /></article>)}</div></section>

      <section className="border-y border-white/[0.08] bg-[#eaf2f7] text-[#071321]" id="workflow"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8 lg:py-28"><div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1786bf]">A clearer way to work</p><h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] lg:text-5xl">See the building before it is built.</h2><p className="mt-6 max-w-lg text-base leading-7 text-[#526474]">Generate, compare, and communicate design decisions through spatial models that your whole project team can understand.</p><div className="mt-10 space-y-5">{[['01', 'Generate', 'Start from your site, brief, and constraints.'], ['02', 'Coordinate', 'See structure, services, and spaces together.'], ['03', 'Communicate', 'Share a decision-ready model with everyone.']].map(([num, title, text]) => <div key={num} className="flex gap-5 border-t border-[#b8cbd6] pt-5"><span className="font-mono text-sm text-[#1786bf]">{num}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm text-[#637587]">{text}</p></div></div>)}</div></div><div className="relative overflow-hidden rounded-2xl bg-white p-3 shadow-2xl shadow-[#7f98a8]/20"><img src={explodedImage} alt="Exploded axonometric building model" className="h-[420px] w-full rounded-xl object-cover" /><div className="absolute bottom-7 left-7 rounded-lg border border-white/20 bg-[#071321]/90 px-4 py-3 text-xs text-white backdrop-blur"><span className="text-[#42c5ff]">MODEL VIEW</span><br />Exploded coordination / 04 layers</div></div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32" id="intelligence"><div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"><div className="relative overflow-hidden rounded-2xl border border-[#42c5ff]/20 bg-[#101b2b] p-3"><img src={assistantImage} alt="AI architectural assistant interface" className="h-[400px] w-full rounded-xl object-cover object-center" /><div className="pointer-events-none absolute inset-3 rounded-xl ring-1 ring-inset ring-white/10" /></div><div className="lg:pl-10"><p className="text-xs font-medium uppercase tracking-[0.24em] text-[#42c5ff]">Intelligence, in context</p><h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] text-white lg:text-5xl">Ask better questions. Make stronger moves.</h2><p className="mt-6 text-base leading-7 text-[#8fa3b8]">Your AI assistant understands the plan, the program, and the project context. Use it to test options, find conflicts, and move from uncertainty to action.</p><div className="mt-8 grid grid-cols-2 gap-3">{['Optimize this layout', 'Check natural light', 'Review structure', 'Estimate materials'].map((item) => <Link href="/ai-demo" key={item} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[#b7c8d8] hover:border-[#42c5ff]/50 hover:text-white">{item}<ArrowUpRight size={15} className="text-[#42c5ff]" /></Link>)}</div></div></div></section>

      <section className="relative border-t border-white/[0.08] px-5 py-24 text-center lg:py-32"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(21,123,193,0.2),transparent_58%)]" /><div className="relative mx-auto max-w-3xl"><Sparkles className="mx-auto text-[#42c5ff]" size={24} /><h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white lg:text-6xl">Make every square metre count.</h2><p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#8fa3b8]">Bring your next project into focus with an AI-native workspace for architecture and construction.</p><Link href="/generator" className="mt-9 inline-flex"><Button className="h-12 rounded-lg bg-[#2bbcff] px-7 font-semibold text-[#06101d] hover:bg-[#76d5ff]">Open Clarivo workspace <ArrowUpRight size={17} /></Button></Link></div></section>

      <footer className="border-t border-white/[0.08] px-5 py-8 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-xs text-[#71859d] sm:flex-row"><div className="flex items-center gap-3"><Building2 size={16} className="text-[#42c5ff]" /><span className="font-semibold tracking-[0.2em] text-[#c2d0dc]">CLARIVO</span><span>Architecture intelligence platform</span></div><div className="flex gap-5"><Link href="/generator" className="hover:text-white">Workspace</Link><Link href="/ai-demo" className="hover:text-white">AI demo</Link><span>© 2026 Clarivo</span></div></div></footer>
    </main>
  )
}
