// IMPORTS 
// Styles 
import "../../pages/SignupLogin.css"

// COMPONENTS 
export const SignupMeta = ({ setFormSelector }) => {

    // Button handlers 
    const handleBackButton = () => {
        setFormSelector('SignupOptions')
    }

    return (
        <div className="SignupMeta">
            Sign up with Meta

            <button
                onClick={handleBackButton}
                className="BackBtn">
                Back
            </button>
            
        </div>
    )
}