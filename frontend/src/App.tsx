

import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProblemsPage from './pages/ProblemsPage'
import { useUser } from '@clerk/react'
import { Toaster } from 'react-hot-toast'

function App() {

  const { isSignedIn } = useUser()

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        {/* <Route path='/problems' element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} /> */}
      </Routes>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </>
    // comments:
    // ! error comments
    // ? questioned comment
    // todo: that task has to be done later
    // * other different types of comment
  )
}

export default App
