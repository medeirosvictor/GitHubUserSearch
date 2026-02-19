import { type FC } from 'react'
import { motion } from 'framer-motion'
import type { GitHubUserDetail } from '@/types'

interface ProfileCardProps {
    user: GitHubUserDetail
}

const StatItem: FC<{ label: string; value: number | string }> = ({ label, value }) => (
    <div className="flex flex-col items-center">
        <span className="text-2xl font-montserrat font-bold text-primary-500">
            {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        <span className="text-xs uppercase tracking-wider text-gray-500 mt-1">{label}</span>
    </div>
)

const ProfileCard: FC<ProfileCardProps> = ({ user }) => {
    const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    })

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative w-full max-w-md mx-auto"
        >
            {/* Chroma glow background */}
            <div
                className="absolute -inset-1 rounded-2xl blur-xl opacity-40"
                style={{
                    background: 'linear-gradient(135deg, var(--color-primary-300), var(--color-primary-100), var(--color-secondary-400))',
                }}
            />

            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100 shadow-xl">
                {/* Banner gradient */}
                <div className="h-28 bg-gradient-to-br from-primary-500 via-primary-300 to-secondary-400" />

                {/* Avatar */}
                <div className="flex justify-center -mt-16">
                    <motion.img
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                        src={user.avatar_url}
                        alt={user.login}
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                </div>

                {/* Info */}
                <div className="px-6 pt-4 pb-6 text-center">
                    <h1 className="text-2xl font-bold text-secondary-500 font-montserrat">
                        {user.name || user.login}
                    </h1>
                    <p className="text-primary-300 font-medium mt-0.5">@{user.login}</p>

                    {user.bio && (
                        <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-xs mx-auto">
                            {user.bio}
                        </p>
                    )}

                    {/* Meta tags */}
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {user.location && (
                            <span className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-500 px-3 py-1 rounded-full border border-gray-100">
                                📍 {user.location}
                            </span>
                        )}
                        {user.company && (
                            <span className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-500 px-3 py-1 rounded-full border border-gray-100">
                                🏢 {user.company}
                            </span>
                        )}
                        {user.blog && (
                            <a
                                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs bg-gray-50 text-primary-500 px-3 py-1 rounded-full border border-gray-100 hover:bg-primary-100/30 transition-colors"
                            >
                                🔗 {user.blog.replace(/^https?:\/\//, '').slice(0, 30)}
                            </a>
                        )}
                        {user.twitter_username && (
                            <a
                                href={`https://twitter.com/${user.twitter_username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs bg-gray-50 text-primary-500 px-3 py-1 rounded-full border border-gray-100 hover:bg-primary-100/30 transition-colors"
                            >
                                𝕏 @{user.twitter_username}
                            </a>
                        )}
                        <span className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-500 px-3 py-1 rounded-full border border-gray-100">
                            📅 Joined {joinDate}
                        </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-gray-100">
                        <StatItem label="Repos" value={user.public_repos} />
                        <StatItem label="Followers" value={user.followers} />
                        <StatItem label="Following" value={user.following} />
                    </div>

                    {/* GitHub link */}
                    <motion.a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary-500 text-white rounded-xl
                                   font-semibold text-sm uppercase tracking-wider
                                   hover:bg-primary-300 transition-colors shadow-md hover:shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        View on GitHub
                    </motion.a>
                </div>
            </div>
        </motion.div>
    )
}

export default ProfileCard
