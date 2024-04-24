import React from 'react'
import SignUp from './DiffrentUI parts/SignUp/Main'
import { GoogleOAuthProvider } from '@react-oauth/google'



function SignUpPage() {
    return (
        <>
            <GoogleOAuthProvider clientId="496937648657-nmdgnmp32lm37u5nr11sl6crottlpn6a.apps.googleusercontent.com"> {/* Provide your Google OAuth client ID */}
                <SignUp/>
            </GoogleOAuthProvider>
            
        </>

    )
}

export default SignUpPage
