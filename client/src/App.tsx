import { useState, useRef, lazy, Suspense } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'

import Header from './components/header/Header'
import Hero from './components/hero/Hero'
import Footer from './components/footer/Footer'
import { useInView } from 'react-intersection-observer'
import About from './components/about/About'
import HowItWorks from './components/how/How'
// const About = lazy(() => import('./components/about/About').then(module => { console.log("About Compoinent Loaded"); return module }))


function App() {
  const catalogRef = useRef(null);

  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  //   rootMargin: '0px',
  //    onChange: (inView) => console.log('inView changed:', inView),
  // })

  return (
    <>
      <Header />
      <Hero />
     
      
      <About />
      <HowItWorks />
      

      <div id='catalog'>
        Catalg
      </div>
      <Footer />
    </>
  )
}

export default App
