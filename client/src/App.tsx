import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import Header from './components/header/Header'
import Hero from './components/hero/Hero'
import Footer from './components/footer/Footer'


function App() {
  const catalogRef = useRef(null);
  
  return (
    <>
    <Header />
    <Hero />
    <div className='h-1000 bg-slate-700'>

    </div>

    <div id='catalog'>
      Catalg
    </div>
    <Footer />
    </>
  )
}

export default App
