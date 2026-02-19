import { type FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import ProfileCard from '@/components/ProfileCard'
import { fetchUserDetail } from '@/api/github'

const UserProfile: FC = () => {
    const { username } = useParams<{ username: string }>()
    const navigate = useNavigate()

    const { data: user, error, isLoading } = useQuery({
        queryKey: ['userDetail', username],
        queryFn: () => fetchUserDetail(username!),
        enabled: !!username,
    })

    const handleBack = () => {
        // If there's browser history (user came from search), go back to preserve URL params + cached query
        if (window.history.length > 1) {
            navigate(-1)
        } else {
            navigate('/')
        }
    }

    return (
        <div className="py-8 px-4 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 mb-8 px-5 py-2 text-sm font-semibold
                               bg-white/70 backdrop-blur-sm rounded-full border border-gray-100 shadow-sm
                               text-primary-500 hover:text-primary-300 hover:shadow-md
                               transition-all duration-200 group cursor-pointer"
                >
                    <span className="transition-transform group-hover:-translate-x-1">←</span>
                    Back to results
                </button>
            </motion.div>

            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-3 mt-16"
                >
                    <div className="w-10 h-10 border-3 border-primary-100 border-t-primary-500 rounded-full animate-spin" />
                    <p className="text-gray-500 text-sm">Loading profile...</p>
                </motion.div>
            )}

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-16 text-center"
                >
                    <p className="text-red-500 font-medium">{(error as Error).message}</p>
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 mt-4 px-5 py-2 text-sm font-semibold
                                   bg-white/70 backdrop-blur-sm rounded-full border border-gray-100 shadow-sm
                                   text-primary-500 hover:text-primary-300 hover:shadow-md
                                   transition-all duration-200 cursor-pointer"
                    >
                        ← Go back to results
                    </button>
                </motion.div>
            )}

            {user && <ProfileCard user={user} />}
        </div>
    )
}

export default UserProfile
