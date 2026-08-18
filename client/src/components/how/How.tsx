import React from 'react'
import { FaBox, FaClipboardCheck, FaSearch, FaShoppingCart } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import { useInView } from 'react-intersection-observer'
import HowCard from './HowCard'



type Step = {
    no: number,
    title: string,
    description: string,
    icon: React.ReactNode,
    color: string,
   

}

let steps: Step[] = [
    {
        no: 1,
        title: "Browse Products",
        description: "Explore our catalog and find the products you want to order.",
        icon: <FaSearch />,
        color: "#CBB9FF",

    },

    {
        no: 2,
        title: "Add to Cart",
        description: "Select your products and choose the quantity you need.",
        icon: <FaShoppingCart />,
        color: "#FFC5B9"

    },

    {
        no: 3,
        title: "Review Your Order",
        description: "Check your items, quantities, and total before placing your order.",
        icon: <FaClipboardCheck />,
        color: "#99B2FF"
    },

    {
        no: 4,
        title: "Send via WhatsApp",
        description: "Send your order directly to us on WhatsApp.",
        icon: <FaMessage />,
        color: "#F2B8EC"

    },
]

export default function HowItWorks() {


    return (
        <section className='py-10 mt-20'>
            <div className="container">
                {/*Section Title */}
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold  tracking-wide text-gray-900">
                        How It Works
                    </h2>
                    <p className="text-sm  leading-tight text-gray-600">
                        Order in just a few simple steps
                    </p>

                </div>


                {/*Steps */}

                {/* Steps */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step) => (
                        <HowCard key={step.no}
                            color={step.color}
                            title={step.title}
                            description={step.description}
                            icon={step.icon}
                            threshold={0.2}
                         />
                    ))}
                </div>


            </div>
        </section>
    )

}

