import React, { useState, type FC } from 'react'
import UserCard from './UserCard'

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

  return (
    <>
        <p className='text-center m-2'>{statusMessage}</p>
        <div className='flex flex-wrap gap-5 justify-center'>
            {users.length && (users.map((user) => {
                if (user.login) {
                    return (
                        <UserCard key={user.login} user={user} />
                    )
                }
            }))}
        </div>
    </>
  )
}

export default SearchResults