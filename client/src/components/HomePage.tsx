import React from 'react'
import Header from './header/Header'
import Hero from './hero/Hero'
import About from './about/About'
import HowItWorks from './how/How'
import Product from './catalog/Product'
import { ErrorBoundary } from 'react-error-boundary'
import Footer from './footer/Footer'

export default function HomePage() {
    return (
        <>
            <Header />
            <Hero />


            <About />
            <HowItWorks />
            <ErrorBoundary FallbackComponent={() => <div>Something went wrong</div>}>
                <div id='' className=''>
                    <Product />
                </div>
            </ErrorBoundary>

            <Footer />

        </>
    )
}
