// IMPORTS 
// Reactr 
import { useState } from "react"
import { useNavigate } from "react-router-dom";
// Styles 
import "../../pages/SignupLogin.css"
// variables 
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// COMPONENTS 

export const SignupEmail = ({ setFormSelector }) => {
    const navigate = useNavigate();

    const [confirmPasswordPH, setConfirmPasswordPH] = useState('Confirm Password')

    const [formData, setFormData] = useState(
        {
            userName: '',
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
    // Function to check password strength //
    function isValidPassword(password) {
        // Password must be at least 8 characters long and contain at least 1 letter and 1 number //
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(password);
    }

    const [isSigningUp, setIsSigningUp] = useState(false)
    const handleSignup = async(e) => {
        e.preventDefault();
        // Check if password meets strength requirements //
        if (!isValidPassword(formData.password)) {
            setConfirmPasswordPH('At least 8 charachers, 1 letter and 1 number');
            setFormData(prevState => ({
                ...prevState,
                password: '',
                confirmPassword: ''
            }));
            return;
        }
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
        // Make the fetch //
        try {
            const response = await fetch(`${backendUrl}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            if (response.ok) {
                window.location.reload();
            }

        } catch (error) {
            console.error('Error:', error.message);
            // Handle errors as needed
        }
    }
    return (
        <div className="SignupEmail">
            <h3>Sign up with Email</h3>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="User Name"
                    required
                />
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