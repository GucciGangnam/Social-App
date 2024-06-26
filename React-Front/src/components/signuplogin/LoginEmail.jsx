// IMPORTS 
// React 
import { useState } from "react"
// RRD 
import { useNavigate } from "react-router-dom";
// Styles 
import "../../pages/SignupLogin.css"
// variables 
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// COMPONENTS 

export const LoginEmail = ({ setFormSelector, fetchMyInfo }) => {

    const navigate = useNavigate();
    // State for loading page on sign in / up
    const [loading, setLoading] = useState(false);

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

    // Placeholder states
    const [passwordPH, setPasswordPH] = useState('Password');


    // Button handlers 
    const handleBackButton = () => {
        setFormSelector('LoginOptions')
    }

    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault();
        setIsLoggingIn(true)
        // Make fetch
        try {
            const response = await fetch(`${backendUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                setLoading(false)
                setFormData({
                    ...formData,
                    password: ''
                });
                setPasswordPH("Email / password don't match");
                setIsLoggingIn(false);
            }

            if (response.ok) {
                setLoading(false)
                localStorage.setItem('accessToken', data.accessToken);
                fetchMyInfo();
                setIsLoggingIn(false);
                navigate("/home")

            }

        } catch (error) {
            console.error('Error:', error.message);
            // Handle errors as needed
        }




    }

    return (
        <>
            {loading ? (
                <div className="loading-animation"></div>
            ) : (
                <div className="LoginEmail">
                    Log in with Email
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email'
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder={passwordPH}
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
        </>
    )
}