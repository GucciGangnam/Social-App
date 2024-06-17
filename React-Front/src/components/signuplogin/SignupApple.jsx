// IMPORTS 
// Styles 
import "../../pages/SignupLogin.css"

// COMPONENTS 
export const SignupApple = ({ setFormSelector }) => {

    // Button handlers 
    const handleBackButton = () => {
        setFormSelector('SignupOptions')
    }

    return (
        <div className="SignupApple">
            Sign up with Apple

            <button
                onClick={handleBackButton}
                className="BackBtn">
                Back
            </button>
            
        </div>
    )
}