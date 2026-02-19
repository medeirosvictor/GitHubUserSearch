import { useState, useRef, useEffect, type FC } from 'react'
import { motion } from 'framer-motion'

interface PillNavProps {
    items: string[]
    activeIndex?: number
    onChange?: (index: number) => void
    className?: string
}

const PillNav: FC<PillNavProps> = ({ items, activeIndex = 0, onChange, className = '' }) => {
    const [active, setActive] = useState(activeIndex)
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 })
    const containerRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

    useEffect(() => {
        setActive(activeIndex)
    }, [activeIndex])

    useEffect(() => {
        const el = itemRefs.current[active]
        const container = containerRef.current
        if (el && container) {
            const containerRect = container.getBoundingClientRect()
            const elRect = el.getBoundingClientRect()
            setPillStyle({
                left: elRect.left - containerRect.left,
                width: elRect.width,
            })
        }
    }, [active, items])

    const handleClick = (index: number) => {
        setActive(index)
        onChange?.(index)
    }

    return (
        <div
            ref={containerRef}
            className={`relative inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full p-1 border border-gray-100 ${className}`}
        >
            <motion.div
                className="absolute top-1 bottom-1 rounded-full bg-primary-500 shadow-md"
                animate={{ left: pillStyle.left, width: pillStyle.width }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
            {items.map((item, index) => (
                <button
                    key={item}
                    ref={(el) => { itemRefs.current[index] = el }}
                    onClick={() => handleClick(index)}
                    className={`relative z-10 px-4 py-1.5 text-xs font-semibold rounded-full cursor-pointer transition-colors duration-200
                        ${active === index ? 'text-white' : 'text-gray-500 hover:text-primary-500'}`}
                >
                    {item}
                </button>
            ))}
        </div>
    )
}

export default PillNav
