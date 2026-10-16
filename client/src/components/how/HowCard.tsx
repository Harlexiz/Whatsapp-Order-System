import { useInView } from "react-intersection-observer"


type Props = {
    key: number,
    color: string,
    icon: React.ReactNode,
    title: string,
    description: string,
    threshold?: number
}

export default function HowCard(props: Props) {
    const { ref, inView } = useInView({
        threshold: props.threshold,
        triggerOnce: true
    })
    return (
        // <div
        //    ref={ref}
        //     className={`relative rounded-2xl  p-6 transition duration-1000 ease-in-out opacity-0 scale-0 ${inView ? 'opacity-100 scale-100':'opacity-0 scale-0'}`}
        // >
        //     <div className={`size-16 md:size-20 mx-auto rounded-md flex items-center justify-center text-white`} style={{ backgroundColor: props.color }}>
        //         <p className='text-xl '> {props.icon}</p>
        //     </div>
        //     <h2 className='text-[18px]  md:text-xl mt-8 text-center font-medium text-gray-700 '>{props.title}</h2>
        //     <p className='text-sm text-center mt-1 text-gray-600'>{props.description}</p>
        // </div>


        <div  ref={ref}
        className={` transition duration-1000 ease-in-out 
        flex flex-col items-center justify-center min-h-50 max-w-[400px] mx-auto sm:max-w-full sm:mx-0 rounded-4xl px-6 pb-8 pt-4 text-white bg-custom-gold
        
        ${inView ? 'opacity-100 scale-100':'opacity-0 scale-0'}
        `} >
            
            
            <div className=" mx-auto pb-4   text-4xl font-extrabold leading-none">{props.icon}</div>
            <h3 className="mb-1.5  text-[20px] font-semibold text-center">{props.title}</h3>
            <p className="opacity-90 text-center text-[13px]">Sign up in under a minute. No card needed.</p>
        
        
        </div>
    )
}