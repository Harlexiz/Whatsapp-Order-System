import { ReactNode } from "react"
import { useInView } from "react-intersection-observer"


type Direction = 'left' | 'right'

interface SlideInFromSide {
    children: ReactNode,
    direction?: Direction,
    className?: string,
    threshold?: number,
    triggerOnce?: boolean
}




export default function SlideIn({children, direction = 'left',className='',threshold=0.5,triggerOnce=true}:SlideInFromSide) {
    const {ref, inView} = useInView({
        triggerOnce,
        threshold
    })
    const hiddenPosition = direction === 'left' ? '-translate-x-40':'translate-x-16'
    return (
        <div ref={ref} className={` transition-all duration-[1s] ease-in-out ${inView ? 'opacity-100 translate-x-0':`opacity-0 ${hiddenPosition}`}  ${className}`}>
            {children}
        </div>
    )
}