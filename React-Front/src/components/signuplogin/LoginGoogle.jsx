// IMPORTS 
// Styles 
import "../../pages/SignupLogin.css"

// COMPONENTS 
export const LoginGoogle = ({ setFormSelector }) => {

    // Button handlers 
    const handleBackButton = () => {
        setFormSelector('LoginOptions')
    }

    return (
        <div className="LoginGoogle">
            Log in with Google

            <button
                onClick={handleBackButton}
                className="BackBtn">
                Back
            </button>
            
        </div>
    )
}