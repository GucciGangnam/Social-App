// IMPORTS 
// Styles 
import "../../pages/SignupLogin.css"

// COMPONENTS 
export const SignupOptions = ({setFormSelector}) => { 



    // Button handlers
    const handleSignupWithEmail = () => { 
        setFormSelector('SignupEmail')
    }

    const handleSignupWithMeta = () => { 
        setFormSelector('SignupMeta')
    }

    const handleSignupWithApple = () => { 
        setFormSelector('SignupApple')
    }

    const handleSignupWithGoogle = () => { 
        setFormSelector('SignupGoogle')
    }

    const handleSignupWithX = () => { 
        setFormSelector('SignupX')
    }

    const handleLoginButton = () => { 
        setFormSelector('LoginOptions')
    }

    return ( 
        <div className="SignupOptions">
            

            <h3>Sign up</h3>
            <button
            onClick={handleSignupWithEmail}>
                <img
                    src='/At-logo.png'
                    alt='Email'
                ></img>
                Sign up with Email
                <div></div>
            </button>

            <button
            onClick={handleSignupWithMeta}>
                <img
                    src='/Meta-logo.png'
                    alt='Meta'
                ></img>
                Sign up with Meta
                <div></div>
            </button>

            <button
            onClick={handleSignupWithApple}>
                <img
                    src='/Apple-logo.png'
                    alt='Apple'
                ></img>
                Sign up with Apple
                <div></div>
            </button>

            <button
            onClick={handleSignupWithGoogle}>
                <img
                    src='/Google-logo.png'
                    alt='Google'
                ></img>
                Sign up with Google
                <div></div>
            </button>

            <button
            onClick={handleSignupWithX}>
                <img
                    src='/X-logo.png'
                    alt='X'
                ></img>
                Sign up with X
                <div></div>
            </button>
            or
            <button
            className="Main"
            onClick={handleLoginButton}>
                <div></div>
                Log in
                <div></div>
            </button>

        </div>
    )
}