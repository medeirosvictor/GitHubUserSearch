import { type FC } from 'react'
import { Link } from 'react-router-dom'
import type { User } from '@/types'

interface UserCardProps {
    user: User
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <Link to={`/user/${user.login}`} className="block">
        <div className='flex flex-col justify-center items-center'>
            <img
                className='w-full aspect-square object-cover rounded-t-xl'
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
            />
            <div className='w-full text-center py-2 px-3 bg-primary-100/40 rounded-b-xl'>
                <span className='text-primary-500 font-semibold text-sm hover:text-primary-300 transition-colors'>
                    {user.login}
                </span>
            </div>
        </div>
    </Link>
  )
}

export default UserCard
