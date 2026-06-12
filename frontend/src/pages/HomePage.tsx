import React from 'react'

import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import toast from "react-hot-toast"

function HomePage() {
    return (
        <div>
            <button className='btn btn-secondary' onClick={() => toast.success("This is a success toast")}>Click</button>
            <header>
                <Show when="signed-out">
                    <SignInButton mode="modal" />
                    <SignUpButton />
                </Show>
                <Show when="signed-in">
                    <UserButton />
                </Show>
            </header>
        </div>
    )
}

export default HomePage