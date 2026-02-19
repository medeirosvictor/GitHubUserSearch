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
    <div className='flex justify-center gap-2 flex-wrap'>
        {
            pages.map((page) => {
                return <button
                    className={`py-1.5 px-3 rounded-xl border border-gray-100 bg-white/80 backdrop-blur-sm
                        cursor-pointer transition-all duration-200
                        hover:bg-primary-100/40 hover:border-primary-300/40 hover:text-primary-500
                        ${activePage == page ? 'active-page rounded-xl':''}`}
                    key={page}
                    onClick={() => handlePageChange(page)}>{page}</button>
            })
        }
    </div>
  )
}

export default Pagination
