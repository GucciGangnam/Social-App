// IMPORTS 
// Styles 
import "../../pages/SignupLogin.css"

// COMPONENTS 
export const LoginMeta = ({ setFormSelector }) => {

    // Button handlers 
    const handleBackButton = () => {
        setFormSelector('LoginOptions')
    }

    return (
        <div className="LoginMeta">
            Log in with Meta

            <button
                onClick={handleBackButton}
                className="BackBtn">
                Back
            </button>
            
        </div>
    )
}