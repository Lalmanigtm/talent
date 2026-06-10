

import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function App() {


  return (
    <>
      <h1>Welcome to the app</h1>

      <header>
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
