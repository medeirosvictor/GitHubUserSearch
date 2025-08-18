import {useCallback, useMemo, useState, type FC} from 'react'

interface PaginationProps {
    totalPosts: number
    postPerPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: FC<PaginationProps> = ({ totalPosts, postPerPage, setCurrentPage }) => {
    const [activePage, setActivePage] = useState<number>(1)
    const totalPages = Math.ceil(totalPosts/postPerPage)

    const pages = useMemo(
        () => Array.from({ length: totalPages }, (_, i) => i + 1),
        [totalPages]
    )

    const handlePageChange = useCallback(
        (page: number) => {
            setCurrentPage(page)
            setActivePage(page)
        }, [setCurrentPage]
    )

  return (
    <div className='flex justify-center gap-1 m-5'>
        {
            pages.map((page) => {
                return <button 
                    className={`py-1 px-2 border-cyan-500 border-2 cursor-pointer hover:bg-primary-100 hover:text-white
                        ${activePage == page ? 'active-page':''}`}
                    key={page} 
                    onClick={() => handlePageChange(page)}>{page}</button>
            })
        }
    </div>
  )
}

export default Pagination