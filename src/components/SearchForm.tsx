import { useState, type FormEvent, type FC } from 'react'

interface SearchFormProps {
    initialName: string
    initialLocation: string
    onSearch: (name: string, location: string) => void
}

const SearchForm: FC<SearchFormProps> = ({ initialName, initialLocation, onSearch }) => {
    const [name, setName] = useState<string>(initialName)
    const [location, setLocation] = useState<string>(initialLocation)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (!name) return
        onSearch(name, location)
    }

    return (
        <div className='w-[300px] mx-auto'>
            <form className='flex flex-col justify-center gap-2' onSubmit={handleSubmit}>
                <input
                    id='name'
                    onChange={(e) => setName(e.target.value)}
                    required
                    value={name}
                    className='bg-white border border-gray-100 rounded-xl px-4 py-3 text-gray-500 placeholder:text-gray-100
                               focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-300 transition-colors'
                    type="text" placeholder='Name' />
                <input
                    id='location'
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    className='bg-white border border-gray-100 rounded-xl px-4 py-3 text-gray-500 placeholder:text-gray-100
                               focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-300 transition-colors'
                    type="text"
                    placeholder='Location' />
                <button
                    className='text-white bg-primary-500 rounded-xl px-4 py-3 font-bold uppercase cursor-pointer
                               hover:bg-primary-300 transition-colors shadow-md hover:shadow-lg'
                    type="submit">
                    search
                </button>
            </form>
        </div>
    )
}

export default SearchForm
