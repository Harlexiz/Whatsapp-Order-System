import { useState, useRef, lazy, Suspense } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import { useInView } from 'react-intersection-observer'

import HomePage from './components/HomePage';
import { router } from './router';
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

        <RouterProvider router={router} />

      </QueryClientProvider>

    </>
  )
}

export default App
