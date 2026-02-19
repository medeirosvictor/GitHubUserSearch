import type { User, GitHubUserDetail } from '@/types'

export interface SearchUsersResult {
    users: User[]
    totalCount: number
    rateLimitWarning: string
}

function parseRateLimitWarning(response: Response): string {
    const remaining = response.headers.get('X-RateLimit-Remaining')
    if (remaining !== null && Number(remaining) <= 3) {
        return ` (⚠ ${remaining} API requests remaining)`
    }
    return ''
}

function parseRateLimitReset(response: Response): string {
    const resetHeader = response.headers.get('X-RateLimit-Reset')
    return resetHeader
        ? new Date(Number(resetHeader) * 1000).toLocaleTimeString()
        : 'a few minutes'
}

export async function searchUsers(name: string, location: string): Promise<SearchUsersResult> {
    let url = `https://api.github.com/search/users?q=${name}`
    if (location) url += `+in:fullname+repos:>4+location:${location}`

    const response = await fetch(url)
    const data = await response.json()

    if (response.status === 403 && data.message?.includes('rate limit')) {
        throw new Error(`Rate limit exceeded. Try again at ${parseRateLimitReset(response)}.`)
    }

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch users.')
    }

    return {
        users: data.items as User[],
        totalCount: data.total_count as number,
        rateLimitWarning: parseRateLimitWarning(response),
    }
}

export async function fetchUserDetail(username: string): Promise<GitHubUserDetail> {
    const response = await fetch(`https://api.github.com/users/${username}`)

    if (response.status === 403) {
        throw new Error(`Rate limit exceeded. Try again at ${parseRateLimitReset(response)}.`)
    }

    if (!response.ok) {
        throw new Error(`User "${username}" not found.`)
    }

    return response.json()
}
