import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import Header from './components/header/Header'


function App() {
  const catalogRef = useRef(null);
  
  return (
    <>
    <Header />
    </>
  )
}

export default App
