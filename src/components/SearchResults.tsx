import { useState, type FC } from 'react'
import UserCard from './UserCard'
import Pagination from './Pagination'
import CountUp from './CountUp'
import ChromaGrid from './ChromaGrid'
import type { User } from '@/types'

interface SearchResultProps {
    users: User[],
    statusMessage: string,
    totalCount: number
}

const SearchResults: FC<SearchResultProps> = ({ users, statusMessage, totalCount }) => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [postPerPage, setPostPerPage] = useState<number>(15)

    const lastPost = currentPage * postPerPage
    const firstPost = lastPost - postPerPage
    const currentPosts = users.slice(firstPost, lastPost)

    const chromaItems = currentPosts
        .filter((user) => user.login)
        .map((user) => ({
            id: user.login,
            content: <UserCard user={user} />,
        }))

  return (
    <div className='flex flex-col'>
        <div className='flex justify-center m-5'>
            <div className='inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-100 shadow-sm'>
                {totalCount > 0 && (
                    <CountUp
                        to={totalCount}
                        from={0}
                        duration={1.5}
                        className='text-primary-500 text-2xl font-montserrat'
                    />
                )}
                <p className='text-center text-white text-[19px]'>{statusMessage}</p>
                {
                    users.length ?
                    <select
                    className='border border-gray-100 bg-white/80 rounded-xl px-2 py-1 w-[65px] text-sm'
                    onChange={(e) => setPostPerPage(Number(e.target.value))}>
                        <option value={15}>15</option>
                        <option value={30}>30</option>
                    </select> : null
                }
            </div>
        </div>

        {chromaItems.length > 0 && (
            <ChromaGrid items={chromaItems} className="px-4 max-w-6xl mx-auto w-full" />
        )}

        {users.length > 0 && (
            <div className='flex justify-center m-5'>
                <div className='inline-flex bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-100 shadow-sm'>
                    <Pagination
                        totalPosts={users.length}
                        postPerPage={postPerPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        )}
    </div>
  )
}

export default SearchResults
