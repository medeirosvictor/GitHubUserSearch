import { useState, useRef, type FC, type ReactNode } from 'react'

interface ChromaGridItem {
    id: string
    content: ReactNode
}

interface ChromaGridProps {
    items: ChromaGridItem[]
    className?: string
}

const ChromaGrid: FC<ChromaGridProps> = ({ items, className = '' }) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div
            ref={containerRef}
            className={`grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ${className}`}
        >
            {items.map((item) => (
                <div
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    {/* Chroma glow behind the card */}
                    <div
                        className="absolute -inset-[2px] rounded-xl opacity-0 blur-md transition-opacity duration-500 pointer-events-none"
                        style={{
                            opacity: hoveredId === item.id ? 0.6 : 0,
                            background: 'linear-gradient(135deg, var(--color-primary-300), var(--color-primary-100), var(--color-secondary-400))',
                        }}
                    />
                    {/* Card content */}
                    <div
                        className="relative rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-100
                                   transition-all duration-300 ease-out
                                   group-hover:scale-[1.03] group-hover:shadow-lg group-hover:border-primary-300/40"
                    >
                        {item.content}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChromaGrid
