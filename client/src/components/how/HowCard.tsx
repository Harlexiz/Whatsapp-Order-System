import { useInView } from "react-intersection-observer"


type Props = {
    key: number,
    color:string,
    icon:React.ReactNode,
    title:string,
    description: string,
    threshold?: number
}

export default function HowCard(props:Props) {
    const {ref, inView} = useInView({
        threshold: props.threshold,
        triggerOnce: true
    })
    return (
        <div
           ref={ref}
            key={props.key}
            className={`relative rounded-2xl  p-6 transition duration-1000 ease-in-out opacity-0 scale-0 ${inView ? 'opacity-100 scale-100':'opacity-0 scale-0'}`}
        >
            <div className={`size-16 md:size-20 mx-auto rounded-md flex items-center justify-center text-white`} style={{ backgroundColor: props.color }}>
                <p className='text-xl '> {props.icon}</p>
            </div>
            <h2 className='text-[18px]  md:text-xl mt-8 text-center font-medium text-gray-700 '>{props.title}</h2>
            <p className='text-sm text-center mt-1 text-gray-600'>{props.description}</p>
        </div>
    )
}