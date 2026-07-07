import type { ReactNode } from 'react'

interface MarqueeProps {
    items: ReactNode[]
    duration?: number
    reverse?: boolean
    className?: string
    separator?: ReactNode
}

/* asterisco propio: glifo garantizado en cualquier sistema */
export function Asterisk({ className = '' }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            fill="currentColor"
            className={`inline-block h-[0.45em] w-[0.45em] ${className}`}
        >
            <path d="M50 0 L58 38 L96 28 L64 50 L96 72 L58 62 L50 100 L42 62 L4 72 L36 50 L4 28 L42 38 Z" />
        </svg>
    )
}

/**
 * Marquee infinito por CSS: dos grupos idénticos desplazados con
 * translateX(-50%) en bucle. Solo transform → 60fps garantizados.
 */
export default function Marquee({
    items,
    duration = 30,
    reverse = false,
    className = '',
    separator = <Asterisk />
}: MarqueeProps) {
    const group = (ariaHidden: boolean, key: string) => (
        <div
            key={key}
            aria-hidden={ariaHidden}
            className="flex shrink-0 items-center"
        >
            {[...Array(4)].map((_, rep) =>
                items.map((item, i) => (
                    <span
                        key={`${rep}-${i}`}
                        className="flex items-center gap-[0.9em] px-[0.45em]"
                    >
                        <span className="whitespace-nowrap">{item}</span>
                        {separator}
                    </span>
                ))
            )}
        </div>
    )

    return (
        <div
            className={`overflow-hidden ${reverse ? 'marquee-reverse' : ''} ${className}`}
        >
            <div
                className="marquee-track"
                style={{ '--marquee-duration': `${duration}s` } as never}
            >
                {group(false, 'a')}
                {group(true, 'b')}
            </div>
        </div>
    )
}
