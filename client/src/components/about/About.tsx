import aboutImg from '../../images/ankara.jpg'
import {handleClick} from '../../utils/scroll.ts'

export default function About() {
    return (
        <section className='py-10'>
            <div className="container">
                <div className='grid items-center gap-10 lg:grid-cols-2 lg:gap-16'>
                    {/*Image */}
                    <div className="order-1">
                        <div className="overflow-hidden rounded-2xl">
                            <img
                                src={aboutImg}
                                alt="Our products"
                                className="h-72 w-full object-cover sm:h-96 lg:h-[450px]"
                            />
                        </div>
                    </div>
                    {/*Text */}

                    <div className='order-2'>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-custom-gold">
                            About Us
                        </p>

                        <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                            Quality products, made easy to order.
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            We make it easy for you to discover and order the products you
                            love. Browse our collection, choose what you need, and send your
                            order directly to us on WhatsApp.
                        </p>

                        <p className="mt-4 text-base leading-7 text-gray-600">
                            No complicated checkout process. No unnecessary steps. Just
                            simple ordering and a direct connection with us.
                        </p>

                        {/* Highlights */}
                        <div className="mt-8 grid grid-cols-2 gap-5">
                            <div>
                                <h3 className="text-2xl font-bold text-custom-gold">100%</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Easy Ordering
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-custom-gold">Fast</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    WhatsApp Response
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={()=>handleClick('catalog')}
                            className="mt-8 cursor-pointer inline-flex items-center rounded-lg bg-custom-gold px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                            Explore Our Products
                        </button>





                    </div>


                </div>
            </div>

        </section>
    )
}

