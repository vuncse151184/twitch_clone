import { SignInButton } from '@clerk/nextjs'

export const CustomSignInButton = () => {
    return (
        <SignInButton>
            <button className='text-white'>Sign In</button>
        </SignInButton>
    )
}