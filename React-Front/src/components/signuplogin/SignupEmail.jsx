// IMPORTS 
// Reactr 
import { useState } from "react"
// Styles 
import "../../pages/SignupLogin.css"

// COMPONENTS 

export const SignupEmail = ({ setFormSelector }) => {

    const [confirmPasswordPH, setConfirmPasswordPH] = useState('Confirm Password')

    const [formData, setFormData] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
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


    // BUTTON HANDLERS 
    // Back btn
    const handleBackButton = () => {
        setFormSelector('SignupOptions')
    }
    // Sign Up btn
    const [isSigningUp, setIsSigningUp] = useState(false)
    const handleSignup = (e) => {
        e.preventDefault();
        // Check if passwords match //
        if (formData.password !== formData.confirmPassword) { 
            setConfirmPasswordPH('Passwords do not match')
            setFormData(prevState => ({
                ...prevState,
                confirmPassword: ''
            }));
            return;
        }
        setIsSigningUp(true)
        // Make teh fetch //
    }
    return (
        <div className="SignupEmail">
            <h3>Sign up with Email</h3>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
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
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder={confirmPasswordPH}
                    required
                />
                <button
                    type="submit"
                    className={isSigningUp ? 'SignupBTN-loading' : 'SignupBTN'}>
                    {isSigningUp ? 'Loading' : 'Sing up'}
                </button>
            </form>

            {!isSigningUp && (
                <button
                    onClick={handleBackButton}
                    className="BackBtn">
                    Back
                </button>
            )}

        </div>
    )
}