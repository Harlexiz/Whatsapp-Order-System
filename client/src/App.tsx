import { useState, useRef, lazy, Suspense } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import Header from './components/header/Header'
import Hero from './components/hero/Hero'
import Footer from './components/footer/Footer'
import { useInView } from 'react-intersection-observer'
import About from './components/about/About'
import HowItWorks from './components/how/How'
import Test from './components/Test';
import Product from './components/catalog/Product';
import { ErrorBoundary } from 'react-error-boundary';
// const About = lazy(() => import('./components/about/About').then(module => { console.log("About Compoinent Loaded"); return module }))






const queryClient = new QueryClient();

function App() {
  const catalogRef = useRef(null);

  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  //   rootMargin: '0px',
  //    onChange: (inView) => console.log('inView changed:', inView),
  // })

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer theme='light' autoClose={500} />
        <ReactQueryDevtools initialIsOpen={false} />

        <Header />
        <Hero />


        <About />
        <HowItWorks />
        {/* <Test /> */}

        <ErrorBoundary FallbackComponent={() => <div>Something went wrong</div>}>
          <div id='' className=''>
            <Product />
          </div>
        </ErrorBoundary>

        <Footer />

      </QueryClientProvider>

    </>
  )
}

export default App
