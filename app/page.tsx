import Link from 'next/link'
import { Hero } from '@/components/hero'
import { ProjectCard } from '@/components/project-card'
import { HomeScrollSnap } from '@/components/home-scroll-snap'
import { getGithubRepos } from '@/lib/github'
import { ArrowRight } from 'lucide-react'

export default async function Home() {
  const repos = await getGithubRepos(process.env.GITHUB_USERNAME!)
  const featured = repos.slice(0, 6)

  return (
    <>
      <HomeScrollSnap />
      <Hero />

      <section id="projects" className="flex min-h-screen flex-col justify-center px-6 py-20 pt-14">
        <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-1 font-mono text-xs uppercase tracking-widest text-white/40">
              GitHub
            </p>
            <h2 className="text-2xl font-bold text-white">
              Projetos em Destaque
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white/80"
          >
            Ver todos
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {featured.length === 0 ? (
          <p className="text-white/30">Nenhum projeto encontrado.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        )}
        </div>
      </section>
    </>
  )
}
