'use client'

import { motion } from 'framer-motion'
import { ExternalLink, GitFork, Star } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { GithubRepo } from '@/lib/github'

const LANG_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  JavaScript: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Python: 'bg-green-500/20 text-green-300 border-green-500/30',
  'C#': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Go: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  Rust: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  Java: 'bg-red-500/20 text-red-300 border-red-500/30',
  PHP: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
}

function langColor(lang: string | null) {
  if (!lang) return 'bg-white/10 text-white/50 border-white/10'
  return LANG_COLORS[lang] ?? 'bg-white/10 text-white/50 border-white/10'
}

interface ProjectCardProps {
  repo: GithubRepo
  index: number
}

export function ProjectCard({ repo, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: 'easeOut' }}
    >
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full"
      >
        <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-white font-mono text-sm font-semibold leading-snug group-hover:text-white/90">
                {repo.name}
              </CardTitle>
              <ExternalLink className="size-3.5 shrink-0 text-white/20 transition-colors group-hover:text-white/50" />
            </div>
            {repo.language && (
              <span
                className={`mt-1 inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${langColor(repo.language)}`}
              >
                {repo.language}
              </span>
            )}
          </CardHeader>

          <CardContent className="flex-1">
            <p className="text-xs leading-relaxed text-white/50 line-clamp-3">
              {repo.description || 'Sem descrição'}
            </p>
          </CardContent>

          <CardFooter className="border-t border-white/5 bg-transparent">
            <div className="flex items-center gap-4 text-xs text-white/30">
              <span className="flex items-center gap-1">
                <Star className="size-3" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="size-3" />
                {repo.forks_count}
              </span>
            </div>
          </CardFooter>
        </Card>
      </a>
    </motion.div>
  )
}
