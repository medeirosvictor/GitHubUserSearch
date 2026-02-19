import SearchForm from '@/components/SearchForm'
import Header from '@/components/Header'
import SearchResults from '@/components/SearchResults'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { searchUsers } from '@/api/github'
import type { FC } from 'react'

const Home: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const name = searchParams.get('q') ?? ''
    const location = searchParams.get('location') ?? ''

    const { data, error, isFetching } = useQuery({
        queryKey: ['searchUsers', name, location],
        queryFn: () => searchUsers(name, location),
        enabled: name.length > 0,
    })

    const handleSearch = (newName: string, newLocation: string) => {
        const params: Record<string, string> = { q: newName }
        if (newLocation) params.location = newLocation
        setSearchParams(params)
    }

    const statusMessage = isFetching
        ? 'Searching...'
        : error
            ? `Error: ${error.message}`
            : data
                ? `users found - displaying:${data.rateLimitWarning}`
                : 'Search for someone!'

    return (
        <>
            <Header />
            <main className='max-w-5/6 mx-auto flex-1'>
                <SearchForm
                    initialName={name}
                    initialLocation={location}
                    onSearch={handleSearch}
                />
                <SearchResults
                    users={data?.users ?? []}
                    statusMessage={statusMessage}
                    totalCount={data?.totalCount ?? 0}
                />
            </main>
        </>
    )
}

export default Home
