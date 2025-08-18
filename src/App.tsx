import SearchForm from './components/SearchForm'
import Header from './components/Header'
import SearchResults from './components/SearchResults'
import { useState, type FC } from 'react'

interface User {
    login: string
    avatar_url: string
    url: string
}

const App: FC = () => {
    const [users, setUsers] = useState<User []>([])
    const [statusMessage, setStatusMessage] = useState<string>('Search for someone!')

  return (
    <div className='app bg-gray-20 font-bold flex flex-col'>
        <Header />
        <main className='max-w-5/6 mx-auto'>
            <SearchForm setUsers={setUsers} setStatusMessage={setStatusMessage} />
            <SearchResults users={users} statusMessage={statusMessage} />
        </main>
    </div>
  )
}

export default App