// IMPORTS 
// Styles 
import "../../pages/SignupLogin.css"

// COMPONENTS 
export const SignupX = ({ setFormSelector }) => {

    // Button handlers 
    const handleBackButton = () => {
        setFormSelector('SignupOptions')
    }

    return (
        <div className="SignupX">
            Sign up with X coming soon

            <button
                onClick={handleBackButton}
                className="BackBtn">
                Back
            </button>

        </div>
    )
}