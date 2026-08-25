import { ProjectCard } from '@/components/project-card'
import { getGithubRepos } from '@/lib/github'

export const metadata = {
  title: 'Projetos — Lucas Romero',
  description: 'Todos os projetos públicos de Lucas Romero no GitHub.',
}

export default async function ProjectsPage() {
  const repos = await getGithubRepos(process.env.GITHUB_USERNAME!)

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 pt-28">
      <div className="mb-12">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-white/40">
          GitHub
        </p>
        <h1 className="text-3xl font-bold text-white">Todos os Projetos</h1>
        <p className="mt-2 text-sm text-white/40">
          {repos.length} repositório{repos.length !== 1 ? 's' : ''} público{repos.length !== 1 ? 's' : ''}
        </p>
      </div>

      {repos.length === 0 ? (
        <p className="text-white/30">Nenhum projeto encontrado.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <ProjectCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
