import React, { type FC } from 'react'

interface User {
    login: string
    avatar_url: string
    url: string
}

interface UserCardProps {
    user: User
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  const userProfileURL = `https://github.com/${user.login}`

  return (
    <div className='flex flex-col justify-center items-left w-[400px]'>
        <img className='md:w-full md:h-full mx-auto h-[250px] w-[250px]' src={user.avatar_url} alt={`user profile pic + ${user.login}`}/>
        <div className='flex justify-around text-primary-500 bg-primary-100 p-1 text-center'>
            <a className='underline' href={userProfileURL} target='_blank' >{user.login}</a>
        </div>
    </div>
  )
}

export default UserCard