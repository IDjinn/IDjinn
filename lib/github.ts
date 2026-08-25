export interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  homepage: string | null
  fork: boolean
}

import { unstable_cacheLife as cacheLife } from 'next/cache'

export async function getGithubRepos(username: string): Promise<GithubRepo[]> {
  'use cache'
  cacheLife('hours')
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=stars&per_page=30&type=owner`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }
  )
  if (!res.ok) return []
  const repos: GithubRepo[] = await res.json()
  return repos.filter((r) => !r.fork)
}
