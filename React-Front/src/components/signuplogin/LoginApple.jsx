// IMPORTS 
// Styles 
import "../../pages/SignupLogin.css"

// COMPONENTS 
export const LoginApple = ({ setFormSelector }) => {

    // Button handlers 
    const handleBackButton = () => {
        setFormSelector('LoginOptions')
    }

    return (
        <div className="LoginApple">
            Log in with Apple

            <button
                onClick={handleBackButton}
                className="BackBtn">
                Back
            </button>
            
        </div>
    )
}