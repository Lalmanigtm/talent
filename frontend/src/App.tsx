

import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function App() {


  return (
    <>

      <header>
        <h1 className='text-red-700'>Welcome to the app</h1>
        <button className='btn btn-primary btn-xl'>Click here</button>
        <button className='btn btn-secondary btn-xs'>Click here</button>

        <Show when="signed-out">
          <SignInButton mode="modal" >login </SignInButton>
          <SignUpButton mode="modal" >Sign up</SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </>
  )
}

export default App
