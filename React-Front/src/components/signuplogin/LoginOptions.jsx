// IMPORTS 
// Styles 
import "../../pages/SignupLogin.css"

// COMPONENTS 
export const LoginOptions = ({setFormSelector}) => { 



    // Button handlers
    const handleLoginWithEmail = () => { 
        setFormSelector('LoginEmail')
    }

    const handleLoginWithMeta = () => { 
        setFormSelector('LoginMeta')
    }

    const handleSignupWithApple = () => { 
        setFormSelector('LoginApple')
    }

    const handleLoginWithGoogle = () => { 
        setFormSelector('LoginGoogle')
    }

    const handleLoginWithX = () => { 
        setFormSelector('LoginX')
    }

    const handleSignupButton = () => { 
        setFormSelector('SignupOptions')
    }

    return ( 
        <div className="SignupOptions">
            

            <h3
            style={{
                color: "var(--primary-fill)"
            }}>Log in</h3>
            <button
            onClick={handleLoginWithEmail}>
                <img
                    src='/At-logo.png'
                    alt='Email'
                ></img>
                Log in with Email
                <div></div>
            </button>

            <button
            onClick={handleLoginWithMeta}>
                <img
                    src='/Meta-logo.png'
                    alt='Meta'
                ></img>
                Log in with Meta
                <div></div>
            </button>

            <button
            onClick={handleSignupWithApple}>
                <img
                    src='/Apple-logo.png'
                    alt='Apple'
                ></img>
                Log in with Apple
                <div></div>
            </button>

            <button
            onClick={handleLoginWithGoogle}>
                <img
                    src='/Google-logo.png'
                    alt='Google'
                ></img>
                Log in with Google
                <div></div>
            </button>

            <button
            onClick={handleLoginWithX}>
                <img
                    src='/X-logo.png'
                    alt='X'
                ></img>
                Log in with X
                <div></div>
            </button>
            or
            <button
            className="Main"
            onClick={handleSignupButton}>
                <div></div>
                Sign up
                <div></div>
            </button>

        </div>
    )
}