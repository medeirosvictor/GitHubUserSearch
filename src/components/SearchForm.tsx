import { useState, type FormEvent, type FC } from 'react'

interface User {
    login: string
    avatar_url: string
    url: string
}

interface SearchFormProps {
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    setStatusMessage: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm: FC<SearchFormProps> = ({ setUsers, setStatusMessage }) => {
    const classes = {
        formContainer: 'w-[300px] mx-auto',
        form: 'flex flex-col justify-center gap-1',
        input: 'border-2 p-3',
        submit: 'text-white bg-primary-500 border-1 p-5 bold uppercase cursor-pointer hover:bg-primary-300'
    }

    const [name, setName] = useState<string>('')
    const [location, setLocation] = useState<string>('')

    const handleSearch = async (event: FormEvent) => {
        event.preventDefault()

        if (!name) return

        setStatusMessage('Searching...');
        setUsers([]);

        const urlMain = 'https://api.github.com/search/users?q='
        let url = `${urlMain}${name}`

        if (location) url += `+in:fullname+repos:>4+location:${location}`

        try {
            const response = await fetch(url)
            const data = await response.json()

            if (response.ok) {
                const usersFound: User[] = data.items
                console.log(usersFound)
                setUsers(usersFound)
                setStatusMessage(`${data.total_count} users found - diplaying: `)
            } else {
                setStatusMessage(`Error: ${data.message || 'Failed to fetch users.'}`)
            }
        } catch(e) {
            console.error('Error on the user request:', e)
            setStatusMessage('Error on the user request')
        }
    }

  return (
    <div className={classes.formContainer}>
        <form className={classes.form} onSubmit={handleSearch}>
            <input 
                id='name'
                onChange={(e) => setName(e.target.value)}
                required
                value={name} 
                className='border-2 p-3' 
                type="text" placeholder='Name' />
            <input 
                id='location'
                onChange={(e) => setLocation(e.target.value)} 
                value={location} 
                className={classes.input} 
                type="text" 
                placeholder='Location' />
            <button className={classes.submit} type="submit">search</button>
        </form>
    </div>
  )
}

export default SearchForm