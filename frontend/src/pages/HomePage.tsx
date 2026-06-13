// import React from 'react'
// import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
// import toast from "react-hot-toast"

// function HomePage() {
//     return (
//         <div>
//             <button className='btn btn-secondary' onClick={() => toast.success("This is a success toast")}>Click</button>
//             <header>
//                 <Show when="signed-out">
//                     <SignInButton mode="modal" />
//                     <SignUpButton />
//                 </Show>
//                 <Show when="signed-in">
//                     <UserButton />
//                 </Show>
//             </header>
//         </div>
//     )
// }
// export default HomePage

// import React from 'react'
import { Link } from 'react-router'
import { ArrowRightIcon, SparkleIcon, ZapIcon } from "lucide-react"
import { SignInButton } from '@clerk/react'

function HomePage() {
    return (
        <div className='bg-linear-to-br from-base-100 via-base-200 to-base-300'>
            {/* Navbar */}
            <nav className='bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg'>
                <div className='max-w-7xl  mx-auto p-4 flex items-center justify-between'>
                    {/* logo */}
                    <Link to={"/"} className='flex items-center gap-3 hover:scale-105 transition-transform duration-200'>
                        <div className='size-10 rounded-xl bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg'>
                            <SparkleIcon className='size-6 text-white' />
                        </div>

                        <div className='flex flex-col'>
                            <span className='font-white text-xl bg-linear-to-br from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider'>Talent-Interview</span>
                            <span className='text-xs text-base-content/60 font-medium -mt-1'>Best Interview</span>
                        </div>
                    </Link>

                    {/* auth Button */}
                    <SignInButton mode="modal" >
                        <button className='group px-6 py-3 bg-linear-to-br from-primary to-secondary rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-3'>
                            <span>Get Started</span>
                            <ArrowRightIcon className='size-4 group-hover:translate-x-0.5 transition-transform' />
                        </button>
                    </SignInButton>

                </div>

            </nav>

            {/* Hero section */}
            <div className='max-w-7xl mx-auto px-4 py-20'>
                <div className='grid lg:grid-cols-2 gap-12 items-center'>
                    {/* left content */}
                    <div className='sapce-y-8'>
                        <div className='badge badge-primary badge-lg'>
                            <ZapIcon className='size-4' />
                            Real time colloboration
                        </div>
                    </div>
                    {/* right image */}
                </div>
            </div>
        </div>
    )
}

export default HomePage