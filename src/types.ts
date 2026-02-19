export interface User {
    login: string
    avatar_url: string
    url: string
}

export interface GitHubUserDetail {
    login: string
    avatar_url: string
    html_url: string
    name: string | null
    company: string | null
    blog: string | null
    location: string | null
    bio: string | null
    twitter_username: string | null
    public_repos: number
    public_gists: number
    followers: number
    following: number
    created_at: string
}
