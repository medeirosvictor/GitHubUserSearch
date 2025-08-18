import { useState, type FC } from 'react'
import UserCard from './UserCard'
import Pagination from './Pagination'

interface User {
    login: string
    avatar_url: string
    url: string
}

interface SearchResultProps {
    users: User[],
    statusMessage: string
}

const SearchResults: FC<SearchResultProps> = ({ users, statusMessage }) => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [postPerPage, setPostPerPage] = useState<number>(15)

    const lastPost = currentPage * postPerPage
    const firstPost = lastPost - postPerPage
    const currentPosts = users.slice(firstPost, lastPost)

  return (
    <div className='flex flex-col'>
        <div className='flex justify-center m-5'>
            <p className='text-center m-2'>{statusMessage}</p>
            {
                users.length ?
                <select
                className='border w-[60px]'
                onChange={(e) => setPostPerPage(Number(e.target.value))}>
                    <option value={15}>15</option>
                    <option value={30}>30</option>
                </select> : ''
            }
        </div>
        <div className='flex flex-wrap gap-5 justify-center'>
            {users.length ? (currentPosts.map((user, index) => {
                if (user.login) {
                    return (
                        <UserCard key={index} user={user} />
                    )
                }
            })) : ''}
        </div>
        {
            users.length ? 
                <Pagination 
                        totalPosts={users.length}
                        postPerPage={postPerPage}
                        setCurrentPage={setCurrentPage}/> : ''
        }
    </div>
  )
}

export default SearchResults