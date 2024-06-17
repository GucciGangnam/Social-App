// IMPORTS 
// React 
import { useState } from "react"
// Styles 
import "../../pages/SignupLogin.css"

// COMPONENTS 

export const LoginEmail = ({ setFormSelector }) => {

    const [formData, setFormData] = useState(
        {
            email: '',
            password: '',
        }
    )
    // On Change Handlers 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    // Button handlers 
    const handleBackButton = () => {
        setFormSelector('LoginOptions')
    }

    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggingIn(true)

    }

    return (
        <div className="LoginEmail">

            Log in with Email

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />

                <button
                    type="submit"
                    className={isLoggingIn ? 'SignupBTN-loading' : 'SignupBTN'}>
                    {isLoggingIn ? 'Loading' : 'Login'}
                </button>

            </form>

            {!isLoggingIn && (
                <button
                    onClick={handleBackButton}
                    className="BackBtn">
                    Back
                </button>
            )}


        </div>
    )
}